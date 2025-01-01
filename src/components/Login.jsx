import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login check (replace with actual logic)
    if (username === "user" && password === "password") {
      const token = jwt.sign({ username: "user" }, "your-secret-key", {
        expiresIn: "1h",
      });

      // Store token in localStorage
      localStorage.setItem("authToken", token);

      // Redirect to protected page
      navigate("/protected");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
