import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import NavBarUser from "./NavBarUser";
import { Button } from "@mui/material";
import './STYLESHEETS/UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState({
    userName: "Suhani Talreja",
    email: "suhani.talreja.29@gmail.com",
    dob: "",
    age: "",
    gender: "",
    instituteCity: "Manipal University Jaipur",
    sports: [],
    level: "",
    linkedinId: "",
    instagramId: "",
    photo: null,
  });
  const sportsOptions = ["Football", "Basketball", "Cricket", "Badminton", "Tennis", "Hockey"];
  const levels = ["Beginner", "Intermediate", "Pro"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "dob") {
      const birthDate = new Date(value);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setUserData((prev) => ({
        ...prev,
        age: age > 0 ? age : "",
      }));
    }
  };

  const handleSportsChange = (e) => {
    const selectedSports = [...e.target.options].filter((o) => o.selected).map((o) => o.value);
    setUserData((prev) => ({
      ...prev,
      sports: selectedSports,
    }));
  };

  const handleDeleteSport = (sportToRemove) => {
    setUserData((prev) => ({
      ...prev,
      sports: prev.sports.filter((sport) => sport !== sportToRemove),
    }));
  };

  return (
    <div>
      <NavBarUser />
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userData.photo ? URL.createObjectURL(userData.photo) : "/IMAGES/user.png"}
            alt="Profile"
            className="profile-photo"
          />
          <h2 className="user-name">{userData.userName}</h2>
          <div className="email-container">
            <span>{userData.email}</span>
            <FaEdit className="edit-icon" />
          </div>
        </div>

        <div className="profile-details">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={userData.dob} onChange={handleChange} />

            <label>Age:</label>
            <input type="number" value={userData.age} readOnly />

            <label>Gender:</label>
            <select name="gender" value={userData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Institute:</label>
            <input type="text" name="instituteCity" value={userData.instituteCity} readOnly />

            <label>Sports:</label>
            <select name="sports" multiple onChange={handleSportsChange} value={userData.sports}>
              <option value="">Select Your Sport</option>
              {sportsOptions.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>

            <div className="selected-sports">
              {userData.sports.map((sport) => (
                <div key={sport} className="selected-sport">
                  <span>{sport}</span>
                  <FaTimes className="delete-icon" onClick={() => handleDeleteSport(sport)} />
                </div>
              ))}
            </div>

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
              name="linkedinId"
              value={userData.linkedinId}
              onChange={handleChange}
              placeholder="LinkedIn Profile"
            />

            <label>Instagram:</label>
            <input
              type="text"
              name="instagramId"
              value={userData.instagramId}
              onChange={handleChange}
              placeholder="Instagram Handle"
            />

            <Button type="submit" variant="contained" className="save">
              SAVE PROFILE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
