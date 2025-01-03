import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate('/student-dashboard'); // Redirect to home if authenticated
    } else {
      alert('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Redirect to forgot password page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>User Login</h2>
          <p>Welcome back</p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or Username"
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
          <>
            <span className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </span>
          </>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="create-account">
          <p>Don't have an account? <a href="/register">Create Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;