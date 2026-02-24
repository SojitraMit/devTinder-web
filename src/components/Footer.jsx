import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0f141a] border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Dev<span className="text-cyan-400">Connect</span>
            </h2>
            <p className="text-gray-400 mt-4 text-sm leading-6">
              Connect with developers worldwide. Build networks. Unlock premium
              features. Grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Connections
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Membership
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Chat
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Terms of Service
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Support
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-gray-400 text-xl">
              <span className="hover:text-cyan-400 cursor-pointer transition">
                🌐
              </span>
              <span className="hover:text-cyan-400 cursor-pointer transition">
                🐙
              </span>
              <span className="hover:text-cyan-400 cursor-pointer transition">
                💼
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DevConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
