import React, { useState } from 'react';
import './STYLESHEETS/LoginPage.css';
import NavBar from './NavBar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState('');

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <h2>Login As Player</h2>
        <form>
          <div>
            <label>Login ID</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className='login-button'>
            Login
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>} 
        </form>
        
        <div className='links'>
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
