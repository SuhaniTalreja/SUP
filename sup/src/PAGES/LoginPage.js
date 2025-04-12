import React, { useState, useEffect } from 'react';
import './STYLESHEETS/LoginPage.css';
import NavBar from './NavBar';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

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
  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));  
    setIsSubmitting(true);  
  };

  useEffect(() => {
    if (isSubmitting) {
      if (!errors.email && !errors.password) {  
        axios.post('http://localhost:3001/login/player', values)
          .then(res => {
            console.log("Login Response:", res.data); 

            if (res.data.success) {  
              localStorage.setItem('playerId', res.data.playerId);  // Store playerId
              navigate("/dashboard");  
            } else {
              alert("No record found");
            }
          })
          .catch(err => {
            console.error("Login error:", err);
            alert("Login failed. Please try again.");
          });
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, navigate, values]);  

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <h2>Login As Player</h2>
        <form className='player-login-player' onSubmit={handleSubmit}>
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
      <Footer/>
    </div>
  );
}

export default LoginPage;
