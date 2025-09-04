<?php
/**
 * Properties API - Handle property CRUD operations
 * Supports GET (list/filter properties) and POST (create property)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        getProperties();
        break;
    case 'POST':
        createProperty();
        break;
    case 'OPTIONS':
        http_response_code(200);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

/**
 * Get properties with optional filtering
 */
function getProperties() {
    global $pdo;
    
    try {
        $filters = [];
        $params = [];
        
        // Build dynamic filters
        $allowedFilters = ['property_type', 'city', 'listing_intent'];
        foreach ($allowedFilters as $filter) {
            if (isset($_GET[$filter]) && !empty($_GET[$filter])) {
                $filters[] = "$filter = ?";
                $params[] = $_GET[$filter];
            }
        }
        
        // Price range filters
        if (isset($_GET['min_price']) && is_numeric($_GET['min_price'])) {
            $filters[] = "price >= ?";
            $params[] = (float)$_GET['min_price'];
        }
        
        if (isset($_GET['max_price']) && is_numeric($_GET['max_price'])) {
            $filters[] = "price <= ?";
            $params[] = (float)$_GET['max_price'];
        }
        
        $whereClause = !empty($filters) ? 'WHERE ' . implode(' AND ', $filters) : '';
        $sql = "SELECT * FROM properties $whereClause ORDER BY created_at DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get RIBL scores for properties
        $riblScores = [];
        if (!empty($properties)) {
            $propertyIds = array_column($properties, 'id');
            if (!empty($propertyIds)) {
                $riblStmt = $pdo->prepare("SELECT property_id, rating FROM ribl_scores WHERE property_id IN (" . implode(',', array_fill(0, count($propertyIds), '?')) . ")");
                $riblStmt->execute($propertyIds);
                $riblScores = $riblStmt->fetchAll(PDO::FETCH_KEY_PAIR);
            }
        }
        
        // Format response data
        foreach ($properties as &$property) {
            $property = formatPropertyData($property);
            $property['ribl_rating'] = $riblScores[$property['id']] ?? null;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $properties,
            'count' => count($properties)
        ]);
        
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

/**
 * Format property data for frontend consumption
 */
function formatPropertyData($property) {
    $property['amenities'] = $property['amenities'] ? explode(',', $property['amenities']) : [];
    $property['price_formatted'] = '₹' . number_format($property['price']);
    
    // Format nearby places
    $nearbyPlaces = [];
    if ($property['nearby_places']) {
        $places = explode(',', $property['nearby_places']);
        foreach ($places as $place) {
            $parts = explode(':', $place, 2);
            if (count($parts) == 2) {
                $nearbyPlaces[] = [
                    'name' => trim($parts[0]),
                    'distance' => trim($parts[1])
                ];
            }
        }
    }
    $property['nearbyPlaces'] = $nearbyPlaces;
    
    // Structure additional data
    $property['projectInfo'] = [
        'projectTitle' => $property['title'],
        'builderName' => $property['developer_name'],
        'fullLocation' => $property['location'] ?: $property['address'],
        'possessionDate' => $property['possession_date'],
        'priceRange' => $property['price_range'],
        'emiFrom' => $property['emi_from']
    ];
    
    $property['developer'] = [
        'name' => $property['developer_name'],
        'established' => $property['developer_established'],
        'experience' => $property['developer_experience']
    ];
    
    $property['legalInfo'] = [
        'rera' => $property['rera_id'] ?: 'Not Available',
        'approvals' => ['RERA Approved', 'Bank Loan Available']
    ];
    
    $property['specifications'] = [
        'age' => $property['possession_date'] ? 'Under Construction' : 'Ready to Move',
        'parking' => 'Available'
    ];
    
    return $property;
}

/**
 * Create new property
 */
function createProperty() {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !validatePropertyInput($input)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
        return;
    }
    
    try {
        $pdo->beginTransaction();
        
        // Prepare data
        $amenitiesStr = !empty($input['amenities']) ? 
            (is_array($input['amenities']) ? implode(',', $input['amenities']) : $input['amenities']) : null;
        $nearbyPlacesStr = !empty($input['nearby_places']) ? 
            (is_array($input['nearby_places']) ? implode(',', $input['nearby_places']) : $input['nearby_places']) : null;
        
        $sql = "INSERT INTO properties (
            title, property_type, bhk_config, area_sqft, price, description, 
            seller_type, listing_intent, enable_bidding, address, state, city, 
            pincode, landmark, latitude, longitude, amenities, nearby_places
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['title'],
            $input['property_type'],
            $input['bhk_config'] ?? null,
            $input['area_sqft'],
            $input['price'],
            $input['description'],
            $input['seller_type'],
            $input['listing_intent'],
            $input['enable_bidding'] ?? 0,
            $input['address'],
            $input['state'],
            $input['city'],
            $input['pincode'],
            $input['landmark'] ?? null,
            $input['latitude'] ?? null,
            $input['longitude'] ?? null,
            $amenitiesStr,
            $nearbyPlacesStr
        ]);
        
        $propertyId = $pdo->lastInsertId();
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Property created successfully',
            'property_id' => $propertyId
        ]);
        
    } catch(PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create property']);
    }
}

/**
 * Validate property input data
 */
function validatePropertyInput($input) {
    $required = ['title', 'property_type', 'area_sqft', 'price', 'description', 
                'seller_type', 'listing_intent', 'address', 'state', 'city', 'pincode'];
    
    foreach ($required as $field) {
        if (empty($input[$field])) {
            return false;
        }
    }
    
    return is_numeric($input['area_sqft']) && is_numeric($input['price']);
}
?>