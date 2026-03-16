import React from "react";
import logo from "../../assets/Logo_copy.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="ExploreX" className="w-10 h-10 object-contain" />
            <h2 className="text-2xl font-semibold text-white">ExploreX</h2>
          </div>
          <p className="text-lg text-gray-400 mb-3">
            Discover smarter travel planning with AI-powered
            recommendations and personalized itineraries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Destinations</li>
            <li className="hover:text-white cursor-pointer">Trips</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-2xl text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-lg">
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-lg">
            <li>Email: support@explorex.com</li>
            <li>Phone No: +91 1400 1120 123</li>
            <li>Location: India</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <span className="text-lg cursor-pointer hover:text-white">LinkedIn | Instagram | Twitter | Website </span>
            {/* <span className="cursor-pointer hover:text-white">🐦</span>
            <span className="cursor-pointer hover:text-white">📷</span>
            <span className="cursor-pointer hover:text-white">💼</span> */}
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-lg text-gray-500 mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} ExploreX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;