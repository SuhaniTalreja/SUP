import React from "react";
import "./STYLESHEETS/UpcomingMatches.css";

const matchImage = "/IMAGES/matches.jpg";

const UpcomingMatches = () => {
  const matches = [
    { id: 1, image: matchImage, name: "Match 1", description: "Details about Match 1" },
    { id: 2, image: matchImage, name: "Match 2", description: "Details about Match 2" },
    { id: 3, image: matchImage, name: "Match 3", description: "Details about Match 3" },
    { id: 4, image: matchImage, name: "Match 4", description: "Details about Match 4" },
  ];

  return (
    <div className="upcoming-matches">
      <h2 className="matches-heading">Upcoming Matches</h2>
      <div className="carousel">
        <div className="carousel-track">
          {matches.map((match, index) => (
            <div className="match-card" key={index}>
              <img src={match.image} alt={match.name} />
              <h3>{match.name}</h3>
              <p>{match.description}</p>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {matches.map((match, index) => (
            <div className="match-card" key={`duplicate-${index}`}>
              <img src={match.image} alt={match.name} />
              <h3>{match.name}</h3>
              <p>{match.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatches;
