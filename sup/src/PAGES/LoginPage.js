import React, { useState, useEffect } from 'react';
import './STYLESHEETS/LoginPage.css';
import NavBar from './NavBar';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
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
    setErrors(Validation(values));  // 🔹 Validate first
    setIsSubmitting(true);  // 🔹 Set flag to track submission
  };

  // 🔥 Run only when errors change
  useEffect(() => {
    if (isSubmitting) {
      if (!errors.email && !errors.password) {  // 🔹 Ensure errors are empty
        axios.post('http://localhost:3000/login/player', values)
          .then(res => {
            if (res.data === "Success") {
              navigate("/");
            } else {
              alert("No record found");
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
  }, [errors, isSubmitting, navigate, values]);  // 🔥 Watch for changes

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <h2>Login As Player</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login ID</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && <span className='error-message'>{errors.password}</span>}
          </div>
          <button type="submit" className='login-button'>
            Login
          </button>
        </form>
        
        <div className='links'>
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/sign-up/player">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
