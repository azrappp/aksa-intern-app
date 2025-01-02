import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FiSun, FiMoon } from "react-icons/fi"; // Ikon tema
import DropdownMenu from "./DropdownMenu";

const Navbar = ({ theme, toggleTheme }) => {
  const [username, setUsername] = useState(null);

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

  const menuItems = [
    {
      label: "Edit Username",
      action: () => (window.location.href = "/edit-username"),
    },
    {
      label: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 items-center justify-center flex backdrop-blur-md bg-white bg-opacity-50 dark:bg-transparent border-b border-gray-300 dark:border-gray-700">
      <div className="w-full max-w-[1080px] flex flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Filfilm
          </span>
        </div>

        {/* Dropdown Username & Theme toggle */}
        <div className="flex items-center space-x-4 relative">
          {username && (
            <DropdownMenu
              buttonLabel={`Hello, ${username}`}
              menuItems={menuItems}
              onSelect={(item) => item.action()}
              icon="chevron" // Bisa ganti dengan 'menu' jika ingin menggunakan ikon menu
            />
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
