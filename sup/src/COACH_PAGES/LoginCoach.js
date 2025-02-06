import React, { useState } from 'react';
import './STYLESHEETS/LoginCoach.css'
import NavBar from '../PAGES/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginCoach() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:3001/login/coach', { email, password })
      .then(result => {
        console.log("Backend response:", result.data); // Debugging log
        if (result.data && result.data.message === "Success") {
          console.log("User Type:", result.data.userType);
          navigate('/coach-profile');
        } else {
          setErrorMessage(result.data.message || "Login failed");
          console.log('Login failed:', result.data.message);
        }
      })
      .catch(err => {
        console.error("Error during login request:", err);
        if (err.response) {
          console.log("Error response:", err.response.data);
          setErrorMessage(err.response.data.message || "Login failed");
        } else {
          setErrorMessage("Login failed due to server error");
        }
      });
  };
  

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <h2>Login As Coach</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login ID</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='login-button'>Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>} 
        </form>
        
        <div className='links'>
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/sign-up-coach">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginCoach;
