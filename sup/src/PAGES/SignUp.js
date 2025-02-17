import React, { useState, useEffect } from 'react';
import './STYLESHEETS/SignUp.css'; 
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';

function SignUp() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values)); // 🔹 Validate first
        setIsSubmitting(true); // 🔹 Set flag for submission
    };

    // 🔥 Run only when errors update
    useEffect(() => {
        if (isSubmitting) {
            if (!errors.username && !errors.email && !errors.password) {  // 🔹 Ensure no validation errors
                axios.post('http://localhost:3001/sign-up/player', values)
                    .then(res => {
                        alert("Successfully created your profile!");
                        localStorage.setItem('playerId', res.data.playerId);
                        navigate("/login/player");
                    })
                    .catch(err => {
                        alert("Error creating account. Try again!");
                        console.log(err);
                    });
            }
            setIsSubmitting(false); // Reset submission flag
        }
    }, [errors, isSubmitting, navigate, values]);

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
                            value={values.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <span className='error-message'>{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className='error-message'>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={values.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <span className='error-message'>{errors.password}</span>}
                    </div>
                    <button type="submit" className="signup-button">
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
