import React, { useState } from 'react';
import './STYLESHEETS/NavBarCoach.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavBarCoach() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        navigate("/"); 
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred while logging out.");
    }
  };


  return (
    <div className="navbar-coach">
      <p className="logo">ATHELINK!</p>

      

      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-items">
          <Link to="/">Home</Link>
          <Link to="/coach-profile-info">Profile</Link>
          <Link to="/update-match">Update Matches</Link>
          <Link to="/register-match">New Match</Link>
        </div>
        <Button variant="contained" className="logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBarCoach;
