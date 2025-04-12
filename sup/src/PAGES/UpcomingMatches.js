import React, { useEffect, useState } from "react";
import "./STYLESHEETS/UpcomingMatches.css";

const defaultImage = "/IMAGES/upcoming_match.jpeg";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/upcoming-matches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long", // Example: Monday
      year: "numeric",
      month: "long", // Example: February
      day: "numeric",
    });
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    return new Date(1970, 0, 1, hours, minutes).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format (AM/PM)
    });
  };

  return (
    <div className="upcoming-matches">
      <h2 className="matches-heading">Upcoming Matches</h2>
      <div className="carousel">
        <div className="carousel-track">
          {matches.map((match, index) => (
            <div className="match-card" key={index}>
              <img
                src={match.poster_url || defaultImage}
                alt={match.tournament}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <h3>{match.tournament}</h3>
              <p><strong>Sport:</strong> {match.sport}</p>
              <p><strong>Level:</strong> {match.level}</p>
              <p><strong>Date:</strong> {formatDate(match.match_date)}</p>
              <p><strong>Time:</strong> {formatTime(match.match_time)}</p>
              <p><strong>Venue:</strong> {match.venue}</p>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {matches.map((match, index) => (
            <div className="match-card" key={`duplicate-${index}`}>
              <img
                src={match.poster_url || defaultImage}
                alt={match.tournament}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <h3>{match.tournament}</h3>
              <p><strong>Sport:</strong> {match.sport}</p>
              <p><strong>Level:</strong> {match.level}</p>
              <p><strong>Date:</strong> {formatDate(match.match_date)}</p>
              <p><strong>Time:</strong> {formatTime(match.match_time)}</p>
              <p><strong>Venue:</strong> {match.venue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatches;
