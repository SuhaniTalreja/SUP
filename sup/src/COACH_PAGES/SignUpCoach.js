import React, { useState } from "react";
import "./STYLESHEETS/SignUpCoach.css";
import { AlertTriangle } from "lucide-react";
import NavBar from "../PAGES/NavBar";

function SignUpCoach() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (adminPassword === "GRANTED") {
      setIsAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/sign-up/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Coach added successfully!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        alert(result.error || "Error adding coach");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:3001/sign-up/coach", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   const result = await response.json();
  //   if (response.ok) {
  //     alert("Coach added successfully!");
  //   } else {
  //     alert(result.error || "Error adding coach");
  //   }
  // };

  return (
    <div>
      <NavBar />
      <div className="signup-coach-container">
        {!isAuthorized ? (
          <form onSubmit={handlePasswordSubmit} className="auth-form">
            <div className="warning-box">
              <AlertTriangle
                size={40}
                color="#D9534F"
                className="warning-icon"
              />
              <p className="warning-text">
                Admin access only. Enter password to continue.
              </p>
            </div>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="password-input"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} className="coach-form">
            <h2>Register Coach</h2>
            <input
              type="text"
              name="name"
              placeholder="Coach Name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Coach Email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Set Password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Add Coach"}
            </button>
          </form>
        )}
        <p className="back-to-login">
          Back to <a href="/login/coach">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpCoach;
