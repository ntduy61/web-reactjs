import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffService from "../services/staff";

const Login = () => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [ip_address, setIpAddress] = useState("115.79.138.97"); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const Lang = "en"; 

    try {
      await StaffService.login(Lang, user_name, password, ip_address, navigate);
    } catch (err) {
      setError("Login failed. Please check your username or password.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="user_name">Username:</label>
          <input
            type="text"
            id="user_name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
