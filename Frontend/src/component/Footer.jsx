import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Hikeon</span>
          </h3>
          <p className="text-gray-400">Exploring tomorrow's adventures today</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/explore" className="text-gray-400 hover:text-white transition-colors">
                Explore Treks
              </Link>
            </li>
            <li>
              <Link to="/#about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <div className="flex items-center space-x-2 text-gray-400">
            <Mail size={16} />
            <span>info@hikeon.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Phone size={16} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin size={16} />
            <span>123 Adventure St, Trekville, TR 12345</span>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Hikeon. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          {" | "}
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer

