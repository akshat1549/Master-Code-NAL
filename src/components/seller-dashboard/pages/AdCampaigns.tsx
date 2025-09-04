import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Sparkles, Flame, Megaphone, Share2, Plus, BarChart3, Edit, Pause, Play, Dot } from "lucide-react";

type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  status: "active" | "paused" | "completed";
  tag?: string;
  budget: number;
  spent: number;
  durationDays: number;
  remainingDays: number;
  impressions: number;
  ctr: number;
  leads: number;
  roi: number;
};

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Premium Apartment - Featured Ad",
    subtitle: "3BHK Premium Apartment, Koramangala",
    status: "active",
    tag: "Featured Listing",
    budget: 25000,
    spent: 18500,
    durationDays: 15,
    remainingDays: 6,
    impressions: 12500,
    ctr: 3.6,
    leads: 23,
    roi: 180,
  },
  {
    id: "2",
    title: "Villa Urgent Sale Campaign",
    subtitle: "4BHK Villa with Garden, Whitefield",
    status: "active",
    tag: "Urgent Sale Badge",
    budget: 15000,
    spent: 8200,
    durationDays: 10,
    remainingDays: 4,
    impressions: 8900,
    ctr: 3.6,
    leads: 15,
    roi: 220,
  },
  {
    id: "3",
    title: "Social Media Boost - Modern Flat",
    subtitle: "2BHK Modern Flat, Electronic City",
    status: "paused",
    tag: "Social Media",
    budget: 12000,
    spent: 12000,
    durationDays: 20,
    remainingDays: 0,
    impressions: 15600,
    ctr: 3.7,
    leads: 28,
    roi: 280,
  },
];

export default function AdCampaigns() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <Dot className="w-6 h-6 text-[#3B4CB8]" />
          <h3 className="text-base font-semibold text-gray-900">Ad Boost & Campaigns</h3>
        </div>
        <Button className="bg-[#3B4CB8] hover:bg-[#2f3fa0] text-white gap-2" size="sm">
          <Plus className="w-4 h-4" /> Create Campaign
        </Button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Megaphone className="w-5 h-5 text-yellow-600" />
              <p className="font-semibold text-gray-900">Featured Ad</p>
            </div>
            <p className="text-xs text-gray-600 mb-1">Top of search results</p>
            <p className="text-lg font-bold text-gray-900">₹500/day</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-700">
              <li>✓ Prime visibility</li>
              <li>✓ Top search placement</li>
              <li>✓ Highlighted listing</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <p className="font-semibold text-gray-900">Urgent Sale Badge</p>
            </div>
            <p className="text-xs text-gray-600 mb-1">Eye-catching urgency indicator</p>
            <p className="text-lg font-bold text-gray-900">₹300/day</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-700">
              <li>✓ Urgent sale badge</li>
              <li>✓ Priority in filters</li>
              <li>✓ Increased CTR</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <p className="font-semibold text-gray-900">Premium Visibility</p>
            </div>
            <p className="text-xs text-gray-600 mb-1">Homepage + category highlights</p>
            <p className="text-lg font-bold text-gray-900">₹800/day</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-700">
              <li>✓ Homepage placement</li>
              <li>✓ Category highlights</li>
              <li>✓ Enhanced listing</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-gray-900">Social Media</p>
            </div>
            <p className="text-xs text-gray-600 mb-1">Cross-platform promotion</p>
            <p className="text-lg font-bold text-gray-900">₹400/day</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-700">
              <li>✓ Facebook & Instagram</li>
              <li>✓ Cross-platform sharing</li>
              <li>✓ WhatsApp promotion</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Active & Recent */}
      <div>
        <p className="text-sm font-semibold mb-2">Active & Recent Campaigns</p>
        <div className="space-y-4">
          {campaigns.map((c) => {
            const progress = Math.min(100, Math.round((c.spent / c.budget) * 100));
            return (
              <Card key={c.id} className="rounded-xl shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{c.title}</p>
                        {c.status === "active" && (
                          <Badge className="bg-green-100 text-green-700 text-[10px]">active</Badge>
                        )}
                        {c.tag && (
                          <Badge className="bg-gray-100 text-gray-700 text-[10px]">{c.tag}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{c.subtitle}</p>

                      <div className="grid grid-cols-2 md:grid-cols-8 gap-3 text-xs">
                        <div>
                          <p className="text-gray-500">Budget</p>
                          <p className="font-medium">₹{c.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Spent</p>
                          <p className="font-medium">₹{c.spent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{c.durationDays} days</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Remaining</p>
                          <p className="font-medium">{c.remainingDays} {c.remainingDays === 1 ? "day" : "days"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Impressions</p>
                          <p className="font-medium text-indigo-700">{c.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">CTR</p>
                          <p className="font-medium text-blue-600">{c.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Leads</p>
                          <p className="font-medium text-orange-600">{c.leads}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">ROI</p>
                          <p className="font-medium text-green-600">{c.roi}%</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Budget Used</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2.5 rounded-full" indicatorClassName="bg-blue-600" />
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="gap-1 text-gray-700">
                        <BarChart3 className="w-4 h-4" /> Analytics
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1 text-gray-700">
                          <Edit className="w-4 h-4" /> Edit
                        </Button>
                        {c.status === "paused" ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
                            <Play className="w-4 h-4" /> Resume
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1 text-gray-700">
                            <Pause className="w-4 h-4" /> Pause
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}


