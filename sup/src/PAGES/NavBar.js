import React, { useState } from 'react';
import './STYLESHEETS/NavBar.css';
import Button from '@mui/material/Button';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <p className="logo">SUP!</p>
 
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
        <Button variant="contained" className="login">
          Login
        </Button>
        <Button variant="outlined" className="signup">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
