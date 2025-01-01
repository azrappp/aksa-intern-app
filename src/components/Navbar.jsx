import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FiSun, FiMoon } from "react-icons/fi"; // Ikon tema (React Icons)

const Navbar = ({ theme, toggleTheme }) => {
  const [username, setUsername] = useState(null);

  // Ambil username dari localStorage setelah halaman dimuat
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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
        <div className="flex items-center space-x-4">
          {username && (
            <span className="text-gray-800 dark:text-white">
              Hello, {username}
            </span>
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
