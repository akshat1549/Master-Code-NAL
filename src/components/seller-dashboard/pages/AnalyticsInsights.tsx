import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function AnalyticsSection() {
  return (
    <div className="space-y-8">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card data-testid="card-avg-time-close">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Time to Close</p>
            <p className="text-3xl font-bold text-foreground mb-1">28 days</p>
            <p className="text-xs text-accent">-5 days vs last period</p>
          </CardContent>
        </Card>
        
        <Card data-testid="card-lead-conversion">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Lead Conversion</p>
            <p className="text-3xl font-bold text-foreground mb-1">4.2%</p>
            <p className="text-xs text-accent">+0.8% vs last period</p>
          </CardContent>
        </Card>
        
        <Card data-testid="card-avg-deal-size">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Deal Size</p>
            <p className="text-3xl font-bold text-foreground mb-1">₹2.8 Cr</p>
            <p className="text-xs text-muted-foreground">+8% vs last period</p>
          </CardContent>
        </Card>
        
        <Card data-testid="card-response-time">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Response Time</p>
            <p className="text-3xl font-bold text-foreground mb-1">12 min</p>
            <p className="text-xs text-accent">-3 min vs last period</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-views-chart">
          <CardHeader>
            <CardTitle>Views vs Inquiries vs Closures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 border rounded-lg flex items-center justify-center text-sm text-gray-500">
              ViewsChart placeholder
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="card-sales-funnel">
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Impressions</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm" data-testid="text-impressions">15,000</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Views</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm" data-testid="text-views">12,000</span>
                  <span className="text-xs text-muted-foreground">80%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Leads</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-3">
                    <div className="bg-accent h-3 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm" data-testid="text-leads">500</span>
                  <span className="text-xs text-muted-foreground">3.3%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tours</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-3">
                    <div className="bg-accent h-3 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="text-sm" data-testid="text-tours">120</span>
                  <span className="text-xs text-muted-foreground">0.8%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Deals</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                  <span className="text-sm" data-testid="text-deals">15</span>
                  <span className="text-xs text-muted-foreground">0.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-locality-heatmap">
          <CardHeader>
            <CardTitle>NAL Locality Heatmap Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Koramangala</span>
                  <span className="text-sm text-muted-foreground">₹12.2 Cr</span>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">High Demand</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Whitefield</span>
                  <span className="text-sm text-muted-foreground">₹8.5 Cr</span>
                </div>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Medium Demand</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Electronic City</span>
                  <span className="text-sm text-muted-foreground">₹6.8 Cr</span>
                </div>
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">High Demand</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-foreground">JP Nagar</span>
                  <span className="text-sm text-muted-foreground">₹5.2 Cr</span>
                </div>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Medium Demand</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-performance-trends">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Property Views</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">+18%</span>
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lead Quality</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">+12%</span>
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Response Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">+8%</span>
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Conversion Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">+15%</span>
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
