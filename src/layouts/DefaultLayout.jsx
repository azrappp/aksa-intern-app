import Navbar from "../components/Navbar";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme(); // Gunakan hook

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {/* Body */}
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Dark Mode Toggle</h1>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
        <main className="flex-1 p-16 pt-8">{children}</main>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
