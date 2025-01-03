import Navbar from "../components/Navbar";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme(); // Gunakan hook

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main Content */}

      <div className="absolute inset-0 max-w-[1080px] flex justify-between px-8 z-0 mx-auto">
        <div className="border-l border-dashed border-gray-300 dark:border-gray-600 h-full opacity-20"></div>
        <div className="border-l border-dashed border-gray-300 dark:border-gray-600 h-full opacity-20"></div>
        <div className="border-l border-dashed border-gray-300 dark:border-gray-600 h-full opacity-20"></div>
        <div className="border-l border-dashed border-gray-300 dark:border-gray-600 h-full opacity-20"></div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {/* Body */}

        <main className="mx-auto z-10 pt-20 max-w-[1080px] ">{children}</main>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
