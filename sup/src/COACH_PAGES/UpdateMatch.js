import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../PAGES/Footer";
import styled from "styled-components";
import NavBarCoach from "./NavBarCoach";
import WinnerSelection from "./WinnerSelection"; 
import moment from "moment"; // Add moment.js for date formatting

function UpdateMatch() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/update-match")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, []);

  const fetchPlayers = () => {
    axios.get("http://localhost:3001/get-players") 
      .then((response) => {
        setPlayers(response.data);
        setShowDropdown(true);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  };

  const handleDeclareWinners = (matchId) => {
    setSelectedMatch(matchId);
    fetchPlayers(matchId);
  };

  const handleSubmitWinners = () => {
    console.log("Selected winners before mapping:", selectedWinners);

    if (!selectedMatch || !selectedWinners || selectedWinners.length === 0) {
        console.error("Invalid match ID or winners list.");
        return;
    }

    const winnerIds = selectedWinners
        .filter(player => player && player.playerId !== undefined)
        .map(player => player.playerId);

    if (winnerIds.length === 0) {
        console.error("No valid player IDs selected.");
        return;
    }

    const winnersData = { players: winnerIds };

    axios.post(`http://localhost:3001/save-winners/${selectedMatch}`, { winners: winnersData })
          .then((response) => {
              console.log("Winners saved successfully:", response.data);
              setShowDropdown(false);
              setSelectedWinners([]);
          })
          .catch((error) => {
              console.error("Error saving winners:", error);
          });
  };

  const handleCloseRegistration = (matchId) => {
    axios.post(`http://localhost:3001/close-registration/${matchId}`)
      .then((response) => {
        console.log("Registration closed successfully:", response.data);
        alert(response.data.message);
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.match_id === matchId ? { ...match, is_open: 0 } : match
          )
        );
      })
      .catch((error) => {
        console.error("Error closing registration:", error);
      });
  };
  
  return (
    <StyledPage>
      <div className="home-container">
        <NavBarCoach />
        <h1 className="heading">Update Matches</h1>
        <StyledWrapper>
          <div className="cards-container">
            {matches.map((match, index) => (
              <div className="card" key={match.id}>
                <div className="header">
                  <span className="title">{match.tournament}</span>
                  <span className="price">{match.sport}</span>
                </div>
                <p className="desc">
                  <b>Level:</b> {match.level} <br />
                  <b>Age Group:</b> {match.age_group} <br />
                  <b>📅 Date:</b> {moment(match.match_date).format("MMMM Do YYYY")}  <br />
                  <b>⏰ Time:</b> {moment(match.match_time, "HH:mm:ss").format("h:mm A")} <br />
                  <b>🏟️ Venue:</b> {match.venue}  <br />
                  <a href={match.registration_link} target="_blank" rel="noopener noreferrer">
                    Register Here
                  </a>
                </p>
                <button type="button"  className="action"  onClick={() => handleCloseRegistration(match.match_id)}>Close Registration</button>
                <button type="button" className="action" onClick={() => handleDeclareWinners(match.match_id)}>Declare Winners</button>
              </div>
            ))}
          </div>
  
          {showDropdown && (
              <div className="winner-selection-container">
                <WinnerSelection
                  selectedOptions={selectedWinners}
                  onChange={setSelectedWinners}
                />
                <button className="submit-btn" onClick={handleSubmitWinners}>
                  Submit Winners
                </button>
              </div>
            )}
        </StyledWrapper>
      </div>
      <Footer />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  display: flex;
  flex-direction: column;
`;

const StyledWrapper = styled.div`
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;
  }

  .card {
    width: 320px;
    border-radius: 0.25rem;
    background-color: #173b61;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffebd0;
  }

  .price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffebd0;
  }

  .desc {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.625;
    color: rgba(156, 163, 175, 1);
  }

  .action {
    border: none;
    outline: none;
    display: inline-block;
    border-radius: 0.25rem;
    background-color: #fd8916;
    padding: 0.75rem 1.25rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #173b61;
    margin-bottom: 1rem;
  }
  .action:hover {
    background: #e07712;
  }

  .heading {
    display: flex;
    justify-content: center; 
    align-items: center;
    font-size: 2rem;
    margin: 2rem 0;
    color: #173b61;
  }

  .winner-selection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    width: 300px;
  }

  .submit-btn {
    border: none;
    outline: none;
    display: inline-block;
    border-radius: 0.25rem;
    background-color: #fd8916;
    padding: 0.75rem 1.25rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #173b61;
    margin-top: 1rem;
    width: 100%;
  }

  .dropdown-container {
    margin-top: 1rem;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    width:300px;
  }

  .submit-btn:hover {
    background: #e07712;
  }

  @media (max-width: 768px) {
    .cards-container {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    .card {
      width: 70%;
    }

    .heading {
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    .winner-selection-container {
      width: 70%;
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%;
      padding: 1rem;
    }

    .title {
      font-size: 1.25rem;
    }

    .price {
      font-size: 1.25rem;
    }

    .action {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .winner-selection-container {
      width: 90%;
    }
  }
`;

export default UpdateMatch;
