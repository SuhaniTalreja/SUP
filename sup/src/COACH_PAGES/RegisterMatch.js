import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; 
import "./STYLESHEETS/RegisterMatch.css";
import Footer from "../PAGES/Footer";
import NavBarCoach from "./NavBarCoach";

const RegisterMatch = () => {
  const [poster, setPoster] = useState(null);
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("AM");

  const handleFileUpload = (event) => {
    setPoster(event.target.files[0]);
  };

  return (
    <div>
      <NavBarCoach />
      <div className="register-match-container">
        <div className="register-card">
          <h2 className="title">Register Match 📑</h2>

          <div className="content">
            {/* Match Details Section */}
            <div className="match-details">
              <div className="input-group">
                <label>Match Name</label>
                <input type="text" placeholder="Enter match name" />
              </div>

              <div className="input-group">
                <label>Level</label>
                <input type="text" placeholder="College / National / International" />
              </div>

              <div className="input-group">
                <label>Sport</label>
                <input type="text" placeholder="Football / Basketball / Cricket" />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" />
                </div>

                <div className="input-group time-group">
                  <label>Time</label>
                  <div className="time-input">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Venue</label>
                <input type="text" placeholder="Stadium / Ground Name" />
              </div>

              <div className="input-group">
                <label>Age Group</label>
                <input type="text" placeholder="U-16 / U-19 / Open" />
              </div>

              <div className="input-group">
                <label>Registration Link</label>
                <input type="url" placeholder="Enter registration URL" />
              </div>

              {/* Upload Poster Section */}
              <div className="poster-upload">
                <label className="poster-label">Upload Poster</label>
                <div className="upload-box">
                  <label htmlFor="file-input" className="upload-area">
                    <FaCloudUploadAlt className="upload-icon" />
                    <span>{poster ? poster.name : "Choose File"}</span>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              {/* Register Button */}
              <button className="register-button">Register</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterMatch;
