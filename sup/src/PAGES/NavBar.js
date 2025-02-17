import React, { useState } from 'react';
import './STYLESHEETS/NavBar.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <p className="logo">ATHELINK!</p>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
        {/* Login Dropdown */}
        <div className="dropdown-container">
          <Button 
            variant="contained" 
            className="login" 
            onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
          >
            Login
          </Button>
          {isLoginDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => navigate('/login/player')}>
                Login as Player
              </button>
              <button className="dropdown-item" onClick={() => navigate('/login/coach')}>
                Login as Coach
              </button>
            </div>
          )}
        </div>

        {/* Signup Dropdown */}
        <div className="dropdown-container">
          <Button 
            variant="outlined" 
            className="signup" 
            onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
          >
            Sign Up
          </Button>
          {isSignupDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => navigate('/signup/player')}>
                Sign Up as Player
              </button>
              <button className="dropdown-item" onClick={() => navigate('/signup/coach')}>
                Sign Up as Coach
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;

