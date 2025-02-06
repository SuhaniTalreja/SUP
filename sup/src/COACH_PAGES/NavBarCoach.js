import React, { useState } from 'react';
import './STYLESHEETS/NavBarCoach.css';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

function NavBarCoach() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div className="navbar">
      <p className="logo">SUP!</p>

      

      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-items">
          <Link>Profile</Link>
          <Link>Upcoming Matches</Link>
          <Link>Create Match</Link>
        </div>
        <Button variant="contained" className="logout">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBarCoach;
