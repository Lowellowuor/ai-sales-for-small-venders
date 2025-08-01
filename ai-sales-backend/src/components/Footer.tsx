import { Link } from "react-router-dom";
import {
  Mic,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Changed background to semi-transparent to allow the animated gradient to show through.
    // Adjusted dark mode class for consistency.
    <footer className="bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 py-10 shadow-inner z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"> {/* Adjusted colors */}
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">PitchPoa AI</span> {/* Ensure text color adapts */}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"> {/* Adjusted text colors */}
              Empowering African entrepreneurs with AI-powered sales training.
              Turn every pitch into profit with our revolutionary
              WhatsApp-integrated platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/+254113661960?text=Hello!%20I%20saw%20your%20website%20and%20want%20to%20chat."
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              {/* FIX: This was the problematic line. Ensure no extra space before <a */}
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3> {/* Ensure text color adapts */}
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Product Demo", path: "/demo" },
                { name: "Pricing", path: "/pricing" },
                { name: "Success Stories", path: "/success-stories" },
                { name: "Resources", path: "/resources" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h3> {/* Ensure text color adapts */}
            <ul className="space-y-2">
              {[
                { name: "Help Center", path: "/help-center" },
                { name: "API Documentation", path: "/api-documentation" },
                { name: "Community Forum", path: "/community-forum" },
                { name: "Training Videos", path: "/training-videos" },
                { name: "Contact Support", path: "/contact-support" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3> {/* Ensure text color adapts */}
            <div className="space-y-3">
              <div className="flex items-center cursor-pointer space-x-3">
                <Mail className="w-5 h-5 text-blue-500" /> {/* Adjusted color */}
                <span className="text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  hello@pitchpoa.ai
                </span>
              </div>
              <a
                href="https://wa.me/+254113661960?text=Hello!%20I%20saw%20your%20website%20and%20want%20to%20chat."
                target="_blank"
                rel="noopener noreferrer"
                className="flex hover:no-underline items-center space-x-3"
              >
                <FaWhatsapp className="w-5 h-5 text-blue-500" /> {/* Adjusted color */}
                <span className="text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  WhatsApp
                </span>
              </a>

              <div className="flex cursor-pointer items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" /> {/* Adjusted color */}
                <span className="text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  +254 113 661 960
                </span>
              </div>
              <div className="flex cursor-pointer items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" /> {/* Adjusted color */}
                <span className="text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  Nairobi, Kenya
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center cursor-pointer space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  ISO 27001 Certified
                </span>
              </div>
              <div className="flex cursor-pointer items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">S</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
                  SOC 2 Compliant
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"> {/* Adjusted border color */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
              <Link
                to="/privacy-policy"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                Cookie Policy
              </Link>
              <Link
                to="/gdpr"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              >
                GDPR Compliance
              </Link>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted text colors */}
              © {currentYear} PitchPoa AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
