import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronDown } from "react-icons/fi";

const DropdownMenu = ({
  buttonLabel,
  menuItems,
  onSelect,
  dropdownClassName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-gray-800 dark:text-white focus:outline-none"
      >
        <span>{buttonLabel}</span>
        <FiChevronDown
          className={`ml-2 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className={`z-50 ${dropdownClassName}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelect(item)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  dropdownClassName: PropTypes.string,
};

DropdownMenu.defaultProps = {
  dropdownClassName:
    "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 dark:bg-gray-800 dark:border-gray-700",
};

export default DropdownMenu;
