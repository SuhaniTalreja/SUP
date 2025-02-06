import React from 'react';
import './STYLESHEETS/SignUpCoach.css'; 
import { AlertTriangle } from 'lucide-react'; // Using Lucide React for the warning icon

function SignUpCoach() {
  return (
    <div className="signup-coach-container">
      <div className="warning-box">
        <AlertTriangle size={40} color="#D9534F" className="warning-icon" />
        <p className="warning-text">Contact your institution to access login credentials.</p>
      </div>
      <p className="back-to-login">
        Back to <a href='/login-coach'>Login</a>
      </p>
    </div>
  );
}

export default SignUpCoach;
