import Navbar from "../components/Navbar";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme(); // Gunakan hook

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      {/* Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {/* Body */}
      <main className="mx-auto  pt-20 w-[1080px] ">{children}</main>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
