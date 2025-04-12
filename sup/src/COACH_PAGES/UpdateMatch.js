import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../PAGES/Footer";
import styled from "styled-components";
import NavBarCoach from "./NavBarCoach";
import WinnerSelection from "./WinnerSelection"; 
import moment from "moment"; 
import Popup from "./SuccessMessage";

function UpdateMatch() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [submittedMatches, setSubmittedMatches] = useState({}); // matchId: winners
  const [viewingWinners, setViewingWinners] = useState(false);

  // Function to show popup for a few seconds
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 30000); 
  };

  useEffect(() => {
    axios.get("http://localhost:3001/update-match")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, []);

  useEffect(() => {
    // Step 1: Load players first
    axios.get("http://localhost:3001/get-players")
      .then((response) => {
        setPlayers(response.data);
  
        // Step 2: Once players are available, load winners
        axios.get("http://localhost:3001/get-all-winners")
          .then((winnerResponse) => {
            const winnersByMatch = {};
            winnerResponse.data.forEach((entry) => {
              let parsedData = entry.player_data;
  
              if (typeof parsedData === "string") {
                try {
                  parsedData = JSON.parse(parsedData);
                } catch (error) {
                  console.error(`Invalid JSON for match_id ${entry.match_id}:`, error);
                  return;
                }
              }
  
              const playerIds = Array.isArray(parsedData)
                ? parsedData
                : parsedData.players || [];
  
              // ✅ Now players are available, this will work
              const fullPlayers = playerIds.map((id) =>
                response.data.find((p) => p.playerId === id) || { playerId: id, name: "Unknown" }
              );
  
              winnersByMatch[entry.match_id] = fullPlayers;
            });
  
            setSubmittedMatches(winnersByMatch);
          })
          .catch((error) => {
            console.error("Error fetching submitted winners:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
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

  // const handleSubmitWinners = () => {
  //   console.log("Selected winners before mapping:", selectedWinners);

  //   if (!selectedMatch || !selectedWinners || selectedWinners.length === 0) {
  //       console.error("Invalid match ID or winners list.");
  //       return;
  //   }

  //   const winnerIds = selectedWinners
  //       .filter(player => player && player.playerId !== undefined)
  //       .map(player => player.playerId);

  //   if (winnerIds.length === 0) {
  //       console.error("No valid player IDs selected.");
  //       return;
  //   }

  //   const winnersData = { players: winnerIds };

  //   axios.post(`http://localhost:3001/save-winners/${selectedMatch}`, { winners: winnersData })
  //         .then((response) => {
  //             console.log("Winners saved successfully:", response.data);
  //             setShowDropdown(false);
  //             setSelectedWinners([]);
  //             triggerPopup("Winners updated successfully ✅");
  //         })
  //         .catch((error) => {
  //             console.error("Error saving winners:", error);
  //             triggerPopup("Something went wrong ❌");
  //         });
  // };
  // Update handleSubmitWinners

// const handleSubmitWinners = () => {
//   if (!selectedMatch || !selectedWinners || selectedWinners.length === 0) {
//     console.error("Invalid match ID or winners list.");
//     return;
//   }

//   const winnerIds = selectedWinners
//     .filter(player => player && player.playerId !== undefined)
//     .map(player => player.playerId);

//   if (winnerIds.length === 0) {
//     console.error("No valid player IDs selected.");
//     return;
//   }

//   const winnersData = { players: winnerIds };

//   axios.post(`http://localhost:3001/save-winners/${selectedMatch}`, { winners: winnersData })
//     .then((response) => {
//       console.log("Winners saved successfully:", response.data);
//       setShowDropdown(false);
//       setSubmittedMatches(prev => ({ ...prev, [selectedMatch]: selectedWinners }));
//       setSelectedWinners([]);
//       triggerPopup("Winners updated successfully ✅");
//     })
//     .catch((error) => {
//       console.error("Error saving winners:", error);
//       triggerPopup("Something went wrong ❌");
//     });
// };

const handleSubmitWinners = () => {
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
      setSubmittedMatches(prev => ({
        ...prev,
        [selectedMatch]: selectedWinners // Store full player objects for display
      }));
      setSelectedWinners([]);
      triggerPopup("Winners updated successfully ✅");
    })
    .catch((error) => {
      console.error("Error saving winners:", error);
      triggerPopup("Something went wrong ❌");
    });
};


const handleShowWinners = (matchId) => {
  setSelectedMatch(matchId);
  setViewingWinners(true);
};
  const handleCloseRegistration = (matchId) => {
    axios.post(`http://localhost:3001/close-registration/${matchId}`)
      .then((response) => {
        console.log("Registration closed successfully:", response.data);
        triggerPopup("Registration closed successfully");
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.match_id === matchId ? { ...match, is_open: 0 } : match
          )
        );
      })
      .catch((error) => {
        console.error("Error closing registration:", error);
        triggerPopup("Something went wrong ❌");
      });
  };
  
  return (
    <StyledPage>
      <div className="home-container">
        <NavBarCoach />
        <h1 className="heading">Update Matches</h1>
        {showPopup && <Popup message={popupMessage} className="popup-message"/>}
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
                {/* <button type="button"  className="action"  onClick={() => handleCloseRegistration(match.match_id)}>Close Registration</button>
                <button type="button" className="action" onClick={() => handleDeclareWinners(match.match_id)}>Declare Winners</button> */}
                {/* <button type="button" className="action" onClick={() => handleCloseRegistration(match.match_id)}>
                  Close Registration
                </button> */}
                <button
                    type="button"
                    className={`action ${match.is_open === 0 ? "closed" : ""}`}
                    onClick={() => handleCloseRegistration(match.match_id)}
                    disabled={match.is_open === 0}
                  >
                    {match.is_open === 0 ? "Closed" : "Close Registration"}
                  </button>


                {submittedMatches[match.match_id] ? (
                  <button type="button" className="action" onClick={() => handleShowWinners(match.match_id)}>
                    Show Winners
                  </button>
                ) : (
                  <button type="button" className="action" onClick={() => handleDeclareWinners(match.match_id)}>
                    Declare Winners
                  </button>
                )}
              </div>
            ))}
          </div>
  
          {/* {showDropdown && (
              <div className="winner-selection-container">
                <WinnerSelection
                  selectedOptions={selectedWinners}
                  onChange={setSelectedWinners}
                />
                <button className="submit-btn" onClick={handleSubmitWinners}>
                  Submit Winners
                </button>
              </div>
            )} */}
            {showDropdown && selectedMatch && !submittedMatches[selectedMatch] && (
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
            {submittedMatches[selectedMatch] && viewingWinners && (
              <div className="winner-showcase-container">
                <h3>Selected Winners for {matches.find(match => match.match_id === selectedMatch)?.tournament}</h3>
                <ul>
                  {submittedMatches[selectedMatch].map((winner) => (
                    <li key={winner.playerId}>{winner.name}</li>
                  ))}
                </ul>
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
  .popup-message{
    align-items: center !important;
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
    text-align:center !important;
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

  .action.closed {
    background-color: red;
    cursor: not-allowed;
  }
  .action.closed:hover {
    background: red !important;
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
  .winner-showcase-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    width: 300px;
    background: linear-gradient(to bottom right, #6a9fb5, #94b9c7);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    color:white;
  }

  .winner-showcase-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
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
