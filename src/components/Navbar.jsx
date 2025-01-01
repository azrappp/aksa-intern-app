import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FiSun, FiMoon } from "react-icons/fi"; // Ikon tema (React Icons)

const Navbar = ({ theme, toggleTheme }) => {
  const [username, setUsername] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ambil username dari localStorage setelah halaman dimuat
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Logout berhasil!");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 items-center justify-center flex backdrop-blur-md bg-white bg-opacity-50 dark:bg-transparent border-b border-gray-300 dark:border-gray-700">
      <div className="w-[1080px] flex flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Nonton
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* Displaying username and theme toggle */}
        <div className="flex items-center space-x-4 relative">
          {username && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 dark:text-white focus:outline-none"
              >
                Hello, {username}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 dark:bg-gray-800 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Button onClick={toggleTheme}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
