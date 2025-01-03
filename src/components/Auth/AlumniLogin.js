import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AlumniLogin.css";

const AlumniLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const validCredentials = [
    { email: "priya@gmail.com", password: "priya@2006" },
    { email: "nithi@gmail.com", password: "nithi@2006" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUser = validCredentials.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      setError(""); // Clear any previous error messages
      navigate("/alumni-dashboard");
    } else {
      setError("Invalid email or password. Please try again."); // Set error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Alumni Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Error message */}
      </div>
    </div>
  );
};

export default AlumniLogin;
