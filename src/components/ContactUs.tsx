import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";

export function ContactUs() {
  const contactInfo = [
    { icon: Phone, title: "Phone", info: "+91 98765 43210", subInfo: "Mon-Sat 9AM-7PM" },
    { icon: Mail, title: "Email", info: "support@nalindia.com", subInfo: "24/7 Support" },
    { icon: MapPin, title: "Address", info: "123 Business District, Mumbai", subInfo: "Maharashtra, India" },
    { icon: Clock, title: "Working Hours", info: "Mon-Sat: 9AM-7PM", subInfo: "Sunday: 10AM-5PM" }
  ];

  const services = [
    { icon: MessageCircle, title: "Sales Inquiry", description: "Get help with buying or selling properties" },
    { icon: Headphones, title: "Customer Support", description: "Technical support and general assistance" },
    { icon: Phone, title: "Premium Support", description: "Priority support for NAL Premium members" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0056D2] to-[#00BFA6] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're here to help you with all your real estate needs. 
            Get in touch with our expert team today.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input placeholder="What is this regarding?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us how we can help you..." 
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services? Need help finding the perfect property? 
                Our team is ready to assist you every step of the way.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <item.icon className="w-6 h-6 text-[#0056D2] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-700">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.subInfo}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Services */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Can We Help?</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <service.icon className="w-5 h-5 text-[#00BFA6] mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600">Come meet our team in person</p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#0056D2] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">NAL India Headquarters</h3>
              <p className="text-gray-600">123 Business District, Mumbai, Maharashtra, India</p>
              <Button className="mt-4 bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I list my property on NAL India?</h3>
              <p className="text-gray-600">Simply click on "Post Property" and fill out the required details. Our team will verify and list your property within 24 hours.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there any commission for buyers?</h3>
              <p className="text-gray-600">No, buyers can contact property owners directly without any commission charges through our platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What is NAL Premium?</h3>
              <p className="text-gray-600">NAL Premium offers exclusive features like contacting up to 30 owners directly, access to premium properties, and priority customer support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}