import React, { useState, useEffect, useCallback } from "react";
import NavBarCoach from "./NavBarCoach";
import { Button, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import "./STYLESHEETS/CoachProfile.css";

function CoachProfile() {
  const [coachData, setCoachData] = useState({
    dob: "",
    age: "",
    gender: "",
    sport: "",
    yoe: "",
    linkedin_url: "",
    photo_url: "",
    institute: "",
  });

  const [coachId, setCoachId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState("");

  const sportsOptions = ["Football", "Basketball", "Cricket", "Badminton", "Tennis", "Hockey"];
  const getGoogleDriveImageUrl = (driveUrl) => {
    if (!driveUrl) return "";
    const match = driveUrl.match(/(?:file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/file\/d\/|drive\.google\.com\/uc\?id=)([^/?&]+)/);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveUrl;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/dashboard", { withCredentials: true })
      .then((res) => {
        if (res.data.valid) {
          setCoachId(res.data.coachId);
        }
      })
      .catch(() => setError("Error fetching user session."))
      .finally(() => setLoading(false));
  }, []);

  const fetchCoachProfile = useCallback(() => {
    setLoading(true);
    axios.get("http://localhost:3001/coach-profile-info", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setCoachData(res.data);
        }
      })
      .catch(() => setError("Error fetching profile data."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (coachId) {
      fetchCoachProfile();
    }
  }, [coachId, fetchCoachProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateForMySQL = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setError("");

    const formattedData = {
      ...coachData,
      dob: formatDateForMySQL(coachData.dob),
    };

    axios.post("http://localhost:3001/update-coach-profile", formattedData, { withCredentials: true })
      .then(() => setUpdateSuccess(true))
      .catch(() => setError("Failed to update profile."));
  };

  return (
    <div>
      <NavBarCoach />
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={coachData.photo_url ? getGoogleDriveImageUrl(coachData.photo_url) : "/IMAGES/user.png"}
            alt="Profile"
            className="profile-photo"
            onError={(e) => (e.target.src = "/IMAGES/user.png")}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          <div className="profile-details">
            {error && <Alert severity="error">{error}</Alert>}
            {updateSuccess && <Alert severity="success">Profile updated successfully!</Alert>}

            <form onSubmit={handleSubmit}>
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={coachData.dob} onChange={handleChange} />

              <label>Age:</label>
              <input type="number" name="age" value={coachData.age} onChange={handleChange} />

              <label>Gender:</label>
              <select name="gender" value={coachData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Sport:</label>
              <select name="sport" value={coachData.sport} onChange={handleChange}>
                <option value="">Select Sport</option>
                {sportsOptions.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>

              <label>Years of Experience:</label>
              <input type="number" name="yoe" value={coachData.yoe} onChange={handleChange} />

              <label>LinkedIn:</label>
              <input type="text" name="linkedin_url" value={coachData.linkedin_url} onChange={handleChange} placeholder="Enter LinkedIn URL" />

              <label>Profile Photo URL:</label>
              <input type="text" name="photo_url" value={coachData.photo_url} onChange={handleChange} placeholder="Enter image URL" />

              <label>Institute:</label>
              <input type="text" name="institute" value={coachData.institute} onChange={handleChange} />

              <Button type="submit" variant="contained" className="save" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "SAVE PROFILE"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoachProfile;
