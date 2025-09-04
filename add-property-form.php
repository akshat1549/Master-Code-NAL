<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Property - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 800px; margin: 20px auto; background: white; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        input[type="file"] { padding: 5px; }
        small { color: #666; font-size: 12px; }
        textarea { height: 100px; resize: vertical; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn { padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #2980b9; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Add New Property</h1>
            <p>Fill in the property details to add to database</p>
        </div>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require_once 'config/database.php';
            
            try {
                $pdo->beginTransaction();
                
                // Insert property
                // Handle file uploads
                $mediaData = null;
                $documentsData = null;
                
                if (!empty($_FILES['media']['name'][0])) {
                    $mediaFiles = [];
                    for ($i = 0; $i < count($_FILES['media']['name']); $i++) {
                        if ($_FILES['media']['error'][$i] === 0) {
                            $mediaFiles[] = file_get_contents($_FILES['media']['tmp_name'][$i]);
                        }
                    }
                    $mediaData = serialize($mediaFiles);
                }
                
                if (!empty($_FILES['documents']['name'][0])) {
                    $docFiles = [];
                    for ($i = 0; $i < count($_FILES['documents']['name']); $i++) {
                        if ($_FILES['documents']['error'][$i] === 0) {
                            $docFiles[] = file_get_contents($_FILES['documents']['tmp_name'][$i]);
                        }
                    }
                    $documentsData = serialize($docFiles);
                }
                
                $sql = "INSERT INTO properties (
                    title, property_type, bhk_config, area_sqft, price, description, 
                    seller_type, listing_intent, enable_bidding, address, state, city, 
                    pincode, landmark, latitude, longitude, beds, baths, area, location,
                    developer_name, developer_established, developer_experience, rera_id,
                    possession_date, project_area, buildings, units, configurations,
                    launch_date, price_range, price_per_sqft, emi_from, amenities, nearby_places, media, documents, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $_POST['title'] ?? '',
                    $_POST['property_type'] ?? '',
                    $_POST['bhk_config'] ?: null,
                    $_POST['area_sqft'] ?? 0,
                    $_POST['price'] ?? 0,
                    $_POST['description'] ?? '',
                    $_POST['seller_type'] ?? '',
                    $_POST['listing_intent'] ?? '',
                    isset($_POST['enable_bidding']) ? 1 : 0,
                    $_POST['address'] ?? '',
                    $_POST['state'] ?? '',
                    $_POST['city'] ?? '',
                    $_POST['pincode'] ?? '',
                    $_POST['landmark'] ?: null,
                    $_POST['latitude'] ?: null,
                    $_POST['longitude'] ?: null,
                    $_POST['beds'] ?: null,
                    $_POST['baths'] ?: null,
                    $_POST['area'] ?: null,
                    $_POST['location'] ?: null,
                    $_POST['developer_name'] ?: null,
                    $_POST['developer_established'] ?: null,
                    $_POST['developer_experience'] ?: null,
                    $_POST['rera_id'] ?: null,
                    $_POST['possession_date'] ?: null,
                    $_POST['project_area'] ?: null,
                    $_POST['buildings'] ?: null,
                    $_POST['units'] ?: null,
                    $_POST['configurations'] ?: null,
                    $_POST['launch_date'] ?: null,
                    $_POST['price_range'] ?: null,
                    $_POST['price_per_sqft'] ?: null,
                    $_POST['emi_from'] ?: null,
                    $_POST['amenities'] ?: null,
                    $_POST['nearby_places'] ?: null,
                    $mediaData,
                    $documentsData,
                    'Active'
                ]);
                
                $propertyId = $pdo->lastInsertId();
                
                $pdo->commit();
                echo '<div class="success">Property added successfully! Property ID: ' . $propertyId . '</div>';
                
            } catch(PDOException $e) {
                $pdo->rollBack();
                echo '<div class="error">Error: Failed to add property</div>';
            }
        }
        ?>

        <form method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label>Property Title *</label>
                <input type="text" name="title" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Property Type *</label>
                    <select name="property_type" required>
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Plot">Plot</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>BHK Configuration</label>
                    <input type="text" name="bhk_config" placeholder="e.g., 3BHK">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Area (sq ft) *</label>
                    <input type="number" name="area_sqft" required>
                </div>
                <div class="form-group">
                    <label>Price (₹) *</label>
                    <input type="number" name="price" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Beds</label>
                    <input type="number" name="beds">
                </div>
                <div class="form-group">
                    <label>Baths</label>
                    <input type="number" name="baths">
                </div>
            </div>

            <div class="form-group">
                <label>Description *</label>
                <textarea name="description" required></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Seller Type *</label>
                    <select name="seller_type" required>
                        <option value="">Select Type</option>
                        <option value="Owner">Owner</option>
                        <option value="Agent">Agent</option>
                        <option value="Company">Company</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Listing Intent *</label>
                    <select name="listing_intent" required>
                        <option value="">Select Intent</option>
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        <option value="Urgent Sale">Urgent Sale</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" name="enable_bidding"> Enable Bidding
                </label>
            </div>

            <div class="form-group">
                <label>Address *</label>
                <textarea name="address" required></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>State *</label>
                    <input type="text" name="state" required>
                </div>
                <div class="form-group">
                    <label>City *</label>
                    <input type="text" name="city" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Pincode *</label>
                    <input type="text" name="pincode" required>
                </div>
                <div class="form-group">
                    <label>Landmark</label>
                    <input type="text" name="landmark">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Latitude</label>
                    <input type="number" name="latitude" step="any">
                </div>
                <div class="form-group">
                    <label>Longitude</label>
                    <input type="number" name="longitude" step="any">
                </div>
            </div>

            <div class="form-group">
                <label>Area (Display)</label>
                <input type="text" name="area" placeholder="e.g., 1200-1800 sq.ft">
            </div>

            <div class="form-group">
                <label>Location (Display)</label>
                <input type="text" name="location" placeholder="e.g., Sector 45, Gurgaon">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Developer Name</label>
                    <input type="text" name="developer_name">
                </div>
                <div class="form-group">
                    <label>Developer Established</label>
                    <input type="text" name="developer_established" placeholder="e.g., 1990">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Developer Experience</label>
                    <input type="text" name="developer_experience" placeholder="e.g., 30+ years">
                </div>
                <div class="form-group">
                    <label>RERA ID</label>
                    <input type="text" name="rera_id">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Possession Date</label>
                    <input type="text" name="possession_date" placeholder="e.g., Dec 2025">
                </div>
                <div class="form-group">
                    <label>Project Area</label>
                    <input type="text" name="project_area" placeholder="e.g., 15 acres">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Buildings</label>
                    <input type="text" name="buildings" placeholder="e.g., 8">
                </div>
                <div class="form-group">
                    <label>Units</label>
                    <input type="text" name="units" placeholder="e.g., 1200">
                </div>
            </div>

            <div class="form-group">
                <label>Configurations</label>
                <input type="text" name="configurations" placeholder="e.g., 2/3/4 BHK">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Launch Date</label>
                    <input type="text" name="launch_date" placeholder="e.g., Jan 2023">
                </div>
                <div class="form-group">
                    <label>Price Range</label>
                    <input type="text" name="price_range" placeholder="e.g., ₹85L - ₹2.5Cr">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Price Per Sq Ft</label>
                    <input type="text" name="price_per_sqft" placeholder="e.g., ₹8,500 - ₹12,000/sq.ft">
                </div>
                <div class="form-group">
                    <label>EMI From</label>
                    <input type="text" name="emi_from" placeholder="e.g., ₹41.4K">
                </div>
            </div>

            <div class="form-group">
                <label>Amenities (comma separated)</label>
                <textarea name="amenities" placeholder="Swimming Pool, Gym, Garden, Security, Parking"></textarea>
            </div>

            <div class="form-group">
                <label>Nearby Places (format: Name:Distance, Name:Distance)</label>
                <textarea name="nearby_places" placeholder="Airport:5 km, Metro Station:2 km, Mall:1 km"></textarea>
            </div>

            <div class="form-group">
                <label>Property Media (Images/Videos)</label>
                <input type="file" name="media[]" multiple accept="image/*,video/*">
                <small>Select multiple images and videos</small>
            </div>

            <div class="form-group">
                <label>Property Documents (PDFs)</label>
                <input type="file" name="documents[]" multiple accept=".pdf">
                <small>Select PDF documents</small>
            </div>

            <button type="submit" class="btn">Add Property</button>
        </form>
    </div>
</body>
</html>