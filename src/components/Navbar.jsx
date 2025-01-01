import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Navbar = ({ theme, toggleTheme }) => {
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
        <Button onClick={toggleTheme}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
