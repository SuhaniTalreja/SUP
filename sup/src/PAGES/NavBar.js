// import React, { useState } from 'react';
// import './STYLESHEETS/NavBar.css';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';

// function NavBar() {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
//   const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="home-navbar">
//       <p className="logo">ATHELINK!</p>

//       <div className="hamburger-menu" onClick={toggleMenu}>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>

//       <div className={`logins ${isMenuOpen ? 'active' : ''}`}>
//         {/* Login Dropdown */}
//         <div className="dropdown-container">
//           <Button 
//             variant="contained" 
//             className="login" 
//             onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
//           >
//             Login
//           </Button>
//           {isLoginDropdownOpen && (
//             <div className="dropdown-menu">
//               <button className="dropdown-item" onClick={() => navigate('/login/player')}>
//                 Login as Player
//               </button>
//               <button className="dropdown-item" onClick={() => navigate('/login/coach')}>
//                 Login as Coach
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Signup Dropdown */}
//         <div className="dropdown-container">
//           <Button 
//             variant="outlined" 
//             className="signup" 
//             onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
//           >
//             Sign Up
//           </Button>
//           {isSignupDropdownOpen && (
//             <div className="dropdown-menu">
//               <button className="dropdown-item" onClick={() => navigate('/signup/player')}>
//                 Sign Up as Player
//               </button>
//               <button className="dropdown-item" onClick={() => navigate('/signup/coach')}>
//                 Sign Up as Coach
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar;
import React, { useState, useEffect, useRef } from 'react';
import './STYLESHEETS/NavBar.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="home-navbar">
      <p className="logo">ATHELINK!</p>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`logins ${isMenuOpen ? 'active' : ''}`} ref={dropdownRef}>
        {/* Login Dropdown */}
        <div className="dropdown-container-nav">
          <Button 
            variant="contained" 
            className="login" 
            onClick={() => handleDropdownToggle('login')}
          >
            Login 
          </Button>
          {activeDropdown === 'login' && (
            <div className="dropdown-menu-nav">
              <button className="dropdown-item-nav" onClick={() => navigate('/login/player')}>
                Login as Player
              </button>
              <button className="dropdown-item-nav" onClick={() => navigate('/login/coach')}>
                Login as Coach
              </button>
            </div>
          )}
        </div>

        {/* Signup Dropdown */}
        <div className="dropdown-container-nav">
          <Button 
            variant="outlined" 
            className="signup" 
            onClick={() => handleDropdownToggle('signup')}
          >
            Sign Up
          </Button>
          {activeDropdown === 'signup' && (
            <div className="dropdown-menu-nav">
              <button className="dropdown-item-nav" onClick={() => navigate('/sign-up/player')}>
                Sign Up as Player
              </button>
              <button className="dropdown-item-nav" onClick={() => navigate('/sign-up/coach')}>
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
