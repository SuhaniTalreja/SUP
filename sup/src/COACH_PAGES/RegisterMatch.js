import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./STYLESHEETS/RegisterMatch.css";
import Footer from "../PAGES/Footer";
import NavBarCoach from "./NavBarCoach";

const RegisterMatch = () => {
  const navigate=useNavigate();
  const [matchData, setMatchData] = useState({
    tournament: "",
    sport: "",
    level: "College",
    age_group: "",
    match_date: "",
    match_time: "",
    venue: "",
    registration_link: "",
    poster_url: "",
    // player_id: "", 
  });

  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register-match", matchData);
      alert(response.data.message);
      navigate('/coach-profile');
    } catch (error) {
      console.error("Error registering match:", error);
      alert("Failed to register match");
    }
  };

  return (
    <div>
      <NavBarCoach />
      <div className="register-match-container">
        <div className="register-card">
          <h2 className="title">Register Match 📑</h2>

          <div className="content">
            <div className="match-details">
              <div className="input-group">
                <label>Match Name</label>
                <input type="text" name="tournament" placeholder="Enter match name" onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Level</label>
                <select name="level" onChange={handleChange}>
                  <option value="College">College</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div className="input-group">
                <label>Sport</label>
                <input type="text" name="sport" placeholder="Football / Basketball / Cricket" onChange={handleChange} />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" name="match_date" onChange={handleChange} />
                </div>

                <div className="input-group">
                  <label>Time</label>
                  <input type="time" name="match_time" onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Venue</label>
                <input type="text" name="venue" placeholder="Stadium / Ground Name" onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Age Group</label>
                <input type="text" name="age_group" placeholder="U-16 / U-19 / Open" onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Registration Link</label>
                <input type="url" name="registration_link" placeholder="Enter registration URL" onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Upload Poster</label>
                <input type="url" name="poster_url" placeholder="Enter poster URL" onChange={handleChange} />
              </div>

              <button className="register-button" onClick={handleSubmit}>Register</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterMatch;
