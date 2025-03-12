import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ user, admin, handleLogout, handleAdminLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleLogout();
      navigate("/auth");
    }
  };

  const handleAdminLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out as admin?");
    if (confirmLogout) {
      handleAdminLogout();
      navigate("/auth");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h4 className="navbar-title">Welcome Back, {user ? user.name : "Guest"} 🥰</h4>
        <button className="navbar-toggler" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-menu" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <div style={{ display: "flex", paddingLeft: "30px", marginLeft: "20px", justifyContent: "flex-end", alignItems: "center" }}>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cakes">Cakes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pickedup">Orders</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-button" onClick={handleLogoutClick}>Logout</button>
                </li>
              </div>
            ) : (
              <div style={{ display: "flex", paddingLeft: "25px" }}>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth">Login / Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminlogin">Admin</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;