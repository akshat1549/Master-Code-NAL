import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Clock, Play, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function KnowledgeHub() {
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Home Loans in 2024",
      excerpt: "Everything you need to know about getting the best home loan rates and terms in the current market.",
      image: "https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3OTY5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Finance",
      readTime: "8 min read",
      publishedAt: "2 days ago",
      trending: true,
    },
    {
      id: 2,
      title: "Real Estate Investment Strategies for Beginners",
      excerpt: "Learn the fundamentals of real estate investment and how to build a profitable property portfolio.",
      image: "https://images.unsplash.com/photo-1635108199395-8cd24af60af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY3OTY5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Investment",
      readTime: "12 min read",
      publishedAt: "1 week ago",
      trending: false,
    },
    {
      id: 3,
      title: "Top 10 Localities in Mumbai for First-time Buyers",
      excerpt: "Discover the best neighborhoods in Mumbai that offer great value for money for first-time homebuyers.",
      image: "https://images.unsplash.com/photo-1754797007288-cfa09b51b056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHNreWxpbmUlMjBjaXR5fGVufDF8fHx8MTc1Njc5Njk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Location Guide",
      readTime: "6 min read",
      publishedAt: "3 days ago",
      trending: true,
    },
    {
      id: 4,
      title: "Legal Checklist for Property Purchase",
      excerpt: "Essential legal documents and verification steps to ensure a safe property transaction.",
      image: "https://images.unsplash.com/photo-1668911494481-1643ee3e1235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaG9tZSUyMHByb3BlcnR5fGVufDF8fHx8MTc1Njc5Njk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Legal",
      readTime: "10 min read",
      publishedAt: "5 days ago",
      trending: false,
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Bandra West Locality Review 2024",
      thumbnail: "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTY3NDkyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "12:45",
      views: "125K views",
      type: "Locality Review",
    },
    {
      id: 2,
      title: "Home Buying Guide for First-time Buyers",
      thumbnail: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3NjM2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "18:30",
      views: "89K views",
      type: "Buyer Guide",
    },
    {
      id: 3,
      title: "Expert Market Analysis Q4 2024",
      thumbnail: "https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3OTY5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "15:20",
      views: "67K views",
      type: "Expert Insights",
    },
  ];

  const categories = [
    { name: "Finance", count: 45, color: "bg-[#0056D2]" },
    { name: "Investment", count: 32, color: "bg-[#00BFA6]" },
    { name: "Legal", count: 28, color: "bg-purple-600" },
    { name: "Market Trends", count: 24, color: "bg-orange-600" },
    { name: "Locality Guides", count: 38, color: "bg-red-600" },
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Hub & NAL TV</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with expert insights, market trends, and comprehensive guides from real estate professionals
          </p>
        </div>

        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="blogs" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center">
              <Play className="w-4 h-4 mr-2" />
              NAL TV
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Topics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-[#0056D2] text-white text-xs">
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge className="bg-[#00BFA6] text-white text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.publishedAt}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full group">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                    
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-black/70 text-white text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#0056D2] text-white text-xs">
                        {video.type}
                      </Badge>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{video.views}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
                <Play className="w-4 h-4 mr-2" />
                View All Videos
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.count} articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated with NAL Insights</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Get weekly market insights, property trends, and expert analysis delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <Button className="bg-white text-[#0056D2] hover:bg-white/90 px-8">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}