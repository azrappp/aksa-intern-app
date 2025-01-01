import { Button as HlButton } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Button = ({ variant = "primary", children, ...props }) => {
  const variants = {
    primary: clsx(
      "bg-white text-slate-900 border border-gray-300", // Light mode
      "dark:bg-gray-800 dark:text-white dark:border-gray-600", // Dark mode
      "hover:bg-gray-100 dark:hover:bg-gray-700", // Hover effects
    ),
    secondary: clsx(
      "bg-gray-100 text-gray-700 border border-gray-200", // Light mode
      "dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700", // Dark mode
      "hover:bg-gray-200 dark:hover:bg-gray-800", // Hover effects
    ),
    outline: clsx(
      "text-slate-900 border border-gray-300", // Light mode
      "dark:text-white dark:border-gray-600", // Dark mode
      "hover:bg-gray-100 dark:hover:bg-gray-700", // Hover effects
    ),
  };

  return (
    <HlButton
      className={clsx(
        "inline-flex flex-nowrap text-nowrap items-center justify-center gap-2 px-6 py-2 font-medium shadow-sm rounded-full transition-colors duration-200",
        "disabled:bg-gray-100 disabled:text-gray-300 dark:disabled:bg-gray-800 dark:disabled:text-gray-500", // Disabled styles
        variant && variants[variant], // Apply variant styles
      )}
      {...props}
    >
      {children}
    </HlButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  children: PropTypes.node.isRequired,
};

export default Button;
