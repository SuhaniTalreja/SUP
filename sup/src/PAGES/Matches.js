import { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import Axios
import Footer from "./Footer";
import styled from "styled-components";
import NavBarUser from "./NavBarUser";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null); // ✅ Track errors

  useEffect(() => {
    axios
      .get("http://localhost:3001/matches", { withCredentials: true }) // ✅ Include credentials if using sessions
      .then((res) => setMatches(res.data))
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches. Please try again later.");
      });
  }, []);

  return (
    <StyledPage>
      <div className="home-container">
        <NavBarUser />
        <h1 className="heading">Upcoming Matches</h1>
        <StyledWrapper>
          <div className="cards-container">
            {error ? (
              <p>{error}</p>
            ) : matches.length > 0 ? (
              matches.map((match, index) => (
                <div className="card" key={index}>
                  <div className="header">
                    <span className="title">
                      {match.sport} - {match.level}
                    </span>
                    <span className="price">{match.age_group}</span>
                  </div>
                  <p className="desc">
                    {match.tournament} at {match.venue} <br />
                    {match.match_date} | {match.match_time}
                  </p>
                  <ul className="lists">
                    <li className="list">📍 Venue: {match.venue}</li>
                    <li className="list">📅 Date: {match.match_date}</li>
                    <li className="list">⏰ Time: {match.match_time}</li>
                  </ul>
                  <a
                    href={match.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button type="button" className="action">Register</button>
                  </a>
                </div>
              ))
            ) : (
              <p>No upcoming matches available.</p>
            )}
          </div>
        </StyledWrapper>
        <Footer />
      </div>
    </StyledPage>
  );
}

// Styled components (unchanged)
const StyledPage = styled.div`
  background-image: url("/doodle.jpg");
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
    margin: 0.75rem 0;
    line-height: 1.5;
    color: rgba(156, 163, 175, 1);
  }

  .lists {
    margin-bottom: 1.5rem;
    color: rgba(156, 163, 175, 1);
  }

  .list {
    margin-bottom: 0.5rem;
    display: flex;
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
    color: #173b61;
  }
`;

export default Matches;
