import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-800 dark:text-gray-200 border-t border-gray-700">
      <div className="container mx-auto px-6 pt-12 pb-4">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="site-logo"
                  className="w-12 h-12 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
                <span className="ml-3 text-2xl font-bold text-white">
                  Reunify
                </span>
              </Link>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting families, reuniting loved ones. Our mission is to bring
              people together through innovative technology and compassionate
              service.
            </p>
          </div>

          {/* Links Section*/}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 border-b border-gray-700 pb-2">
                Explore
              </h3>
              <ul className="space-y-2">
                {["Home", "Campaigns", "How It Works", "Success Stories"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 border-b border-gray-700 pb-2">
                About
              </h3>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Our Team",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">✉️</span>
                <a
                  href="mailto:support@reunify.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  support@reunify.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">📞</span>
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">📍</span>
                <span className="text-gray-400">
                  1234 Innovation Drive, New York, NY
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-gray-400">
            <span>© {new Date().getFullYear()} Reunify</span>
            <span className="mx-1">•</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex space-x-4 md:pt-0 pt-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors duration-300"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-pink-600 transition-colors duration-300"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 transition-colors duration-300"
            >
              <FaTwitter className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
