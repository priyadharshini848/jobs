import React from "react";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      <h1>Welcome to Our Platform</h1>
      <div className="role-buttons">
        <button onClick={() => navigate("/alumni-login")}>Alumni</button>
        <button onClick={() => navigate("/register")}>Student</button>
      </div>
    </div>
  );
};

export default FrontPage;
