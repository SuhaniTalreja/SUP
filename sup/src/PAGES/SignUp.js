import React from 'react';
import './STYLESHEETS/SignUp.css'; 
import NavBar from './NavBar';
import { useState } from 'react';

function SignUp() {
    const [formValues,setFormValues] = useState({
        username:'',
        email:'',
        password:''
    });

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <div>
            <NavBar />
            <div className="signup-container">
                <h1>Create a Player Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your full name"
                            value={formValues.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="signup-button" >
                        Sign Up
                    </button>
                </form>
                <div className="additional-links">
                    <p>Already have an account? <a href="/login/player">Log In</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;