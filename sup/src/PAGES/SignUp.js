import React, { useState } from 'react';
import './STYLESHEETS/SignUp.css'; 
import NavBar from './NavBar';

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <NavBar />
            <div className="signup-container">
                <h1>Create a Player Account</h1>
                {/* Removed the form submit functionality */}
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Sign Up button remains */}
                    <button type="button" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <div className="additional-links">
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
