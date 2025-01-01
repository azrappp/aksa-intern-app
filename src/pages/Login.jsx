import { useState } from "react";
import Input from "../components/Input"; // Pastikan path sesuai
import Button from "../components/Button"; // Pastikan path sesuai
import { FiSun, FiMoon } from "react-icons/fi"; // Ikon tema (React Icons)

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light", // Default ke 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      localStorage.setItem("auth", "true");
      alert("Login berhasil!");
      window.location.href = "/";
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        {/* Toggle Theme Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Login
        </h2>

        {/* Form */}
        <div className="space-y-4 mb-5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
