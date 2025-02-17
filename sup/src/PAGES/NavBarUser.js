import React, { useState } from 'react';
import './STYLESHEETS/NavBarUser.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavBarUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        navigate("/"); // Redirect to homepage or login page
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="navbar">
      <p className="logo">ATHELINK!</p>

      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-items">
          <Link to="/dashboard">Home</Link>
          <Link to="/user-profile">Profile</Link>
          <Link to="/matches">Upcoming Matches</Link> 
          <Link to="/smart-post">Rewards</Link>
          <Link to="/coaches">Coach</Link>
        </div>
        <Button variant="contained" className="logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBarUser;

