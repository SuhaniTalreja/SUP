import React, { useState, useEffect } from 'react';
import './STYLESHEETS/LoginCoach.css';
import NavBar from '../PAGES/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

function LoginCoach() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values)); // Validate first
    setIsSubmitting(true); // Set flag to track submission
  };

  // 🔥 Run only when errors change
  useEffect(() => {
    if (isSubmitting) {
      if (!errors.email && !errors.password) { // Ensure errors are empty
        axios.post('http://localhost:3001/login/coach', values, { withCredentials: true }) // Update URL to /login/coach
          .then(res => {
            if (res.data.status === "Success") {
              navigate("/coach-profile"); // Redirect on success
            } else {
              alert("Invalid login credentials");
            }
          })
          .catch(err => {
            if (err.response) {
              alert(`Login failed: ${err.response.data.error}`);
            } else {
              alert("Login failed due to a network error.");
            }
            console.log(err);
          });
      }
      setIsSubmitting(false); // Reset submission flag
    }
  }, [errors, isSubmitting, navigate, values]); // Watch for changes
  
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
              value={values.email} // Binding email value correctly
              required
              onChange={handleInput}
              name="email" // Added the name attribute
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={values.password} // Binding password value correctly
              required
              onChange={handleInput}
              name="password" // Added the name attribute
            />
          </div>
          <button type="submit" className='login-button'>Login</button>
          {errors.email && <div className="error-message">{errors.email}</div>} 
          {errors.password && <div className="error-message">{errors.password}</div>}
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