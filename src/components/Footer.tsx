import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Contact"],
    },
    {
      title: "Services",
      links: ["Buy Property", "Rent Property", "Sell Property", "Home Loans"],
    },
    {
      title: "Tools",
      links: ["EMI Calculator", "Property Search", "Market Insights", "Mobile App"],
    },
    {
      title: "Support",
      links: ["Help Center", "Terms of Service", "Privacy Policy", "Feedback"],
    },
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities & Contact */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Popular Cities</h3>
              <div className="flex flex-wrap gap-1">
                {cities.map((city, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-400 hover:text-white hover:border-white text-xs h-6 px-2"
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-2">Contact</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 text-[#00BFA6]" />
                  <span className="text-gray-400 text-xs">+91 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3 text-[#00BFA6]" />
                  <span className="text-gray-400 text-xs">support@nalindia.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#0056D2] rounded flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <span className="font-bold text-sm">NAL India</span>
              </div>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center hover:bg-[#0056D2] transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-xs text-gray-400">
              <span>© 2024 NAL India. All rights reserved.</span>
              <div className="flex space-x-3">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}