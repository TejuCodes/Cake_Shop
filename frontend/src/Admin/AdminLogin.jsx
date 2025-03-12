import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../AlertMessage";
const AdminLogin = ({ setAdmin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (name === "admin" && password === "tejuadmin") {
      const admin = { name, role: "admin" };
      localStorage.setItem("admin", JSON.stringify(admin));
      setAdmin(admin);
      navigate("/admindashboard");
    } else {
      setError( <AlertMessage message="Unauthorized access!" type="error" />);
    }
  };

  return (
    <div id="mainda">
      <div className="wrapper">
        <h2>Admin Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Admin Name</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button className="login-btn" type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
