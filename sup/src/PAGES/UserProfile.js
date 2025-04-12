import React, { useState, useEffect ,useCallback} from "react";
import NavBarUser from "./NavBarUser";
import { Button, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import "./STYLESHEETS/UserProfile.css";
import Footer from "./Footer";

function UserProfile() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    institute: "",
    sport: "",
    level: "",
    linkedin_url: "",
    instagram_url: "",
    photo_url: "",
  });

  const [playerId, setPlayerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState("");

  const sportsOptions = ["Football", "Basketball", "Cricket", "Badminton", "Tennis", "Hockey"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const getGoogleDriveImageUrl = (driveUrl) => {
    if (!driveUrl) return ""; // Handle empty URLs
    const match = driveUrl.match(/(?:file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/file\/d\/|drive\.google\.com\/uc\?id=)([^/?&]+)/);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveUrl;
  };
  
  
  useEffect(() => {
    axios.get("http://localhost:3001/dashboard", { withCredentials: true })
      .then((res) => {
        if (res.data.valid) {
          setPlayerId(res.data.playerId);
          setUserData((prev) => ({
            ...prev,
            userName: res.data.username || "Unknown User",
            email: res.data.email || "No Email",
          }));
        }
      })
      .catch((err) => setError("Error fetching user session."))
      .finally(() => setLoading(false));
  }, []);

  const fetchUserProfile = useCallback(() => {
    setLoading(true);
    axios.get("http://localhost:3001/user-profile", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserData((prev) => ({
            ...prev,
            ...res.data,
            userName: prev.userName || res.data.userName, 
          }));
        }
      })
      .catch(() => setError("Error fetching profile data."))
      .finally(() => setLoading(false));
  }, [setLoading, setUserData, setError]);

useEffect(() => {
  if (playerId) {
    fetchUserProfile();
  }
}, [playerId, fetchUserProfile]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const formatDateForMySQL = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setError("");
  
    const formattedData = {
      ...userData,
      dob: formatDateForMySQL(userData.dob), // Convert before sending
    };
  
    axios
      .post("http://localhost:3001/update-profile", formattedData, { withCredentials: true })
      .then(() => {
        setUpdateSuccess(true);
      })
      .catch(() => setError("Failed to update profile."));
  };
  

  return (
    <div>
      <NavBarUser />
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userData.photo_url ? getGoogleDriveImageUrl(userData.photo_url) : "/IMAGES/user.png"}
            alt="Profile"
            className="profile-photo"
            onError={(e) => (e.target.src = "/IMAGES/user.png")} // Fallback if the image fails
          />
          <h2 className="user-name">{userData.userName}</h2>
          <p className="email">{userData.email}</p>
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
              <label>Email:</label>
              <input type="email" name="email" value={userData.email} disabled />

              <label>Date of Birth:</label>
              <input type="date" name="dob" value={userData.dob} onChange={handleChange} />

              <label>Age:</label>
              <input type="number" name="age" value={userData.age} onChange={handleChange} />

              <label>Institute City:</label>
              <input type="text" name="institute" value={userData.institute} onChange={handleChange} />

              <label>Gender:</label>
              <select name="gender" value={userData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label>Sport:</label>
              <select name="sport" value={userData.sport} onChange={handleChange}>
                <option value="">Select Sport</option>
                {sportsOptions.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>

              <label>Level:</label>
              <select name="level" value={userData.level} onChange={handleChange}>
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <label>LinkedIn:</label>
              <input
                type="text"
                name="linkedin_url"
                value={userData.linkedin_url}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
              />

              <label>Instagram:</label>
              <input
                type="text"
                name="instagram_url"
                value={userData.instagram_url}
                onChange={handleChange}
                placeholder="Enter Instagram URL"
              />

              <label>Profile Photo URL:</label>
              <input
                type="text"
                name="photo_url"
                value={userData.photo_url}
                onChange={handleChange}
                placeholder="Enter image URL"
              />

              <Button type="submit" variant="contained" className="save" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "SAVE PROFILE"}
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
