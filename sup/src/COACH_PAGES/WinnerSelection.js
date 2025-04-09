import React, { useState, useEffect } from "react";
import axios from "axios";
import "./STYLESHEETS/WinnerSelection.css";

const WinnerSelection = ({ selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3001/get-players")
        .then((response) => {
          setPlayers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching players:", error);
        });
    }, []);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleSelectOption = (player) => {
      onChange((prevSelected) =>
        prevSelected.some(selectedPlayer => selectedPlayer.playerId === player.playerId)
            ? prevSelected.filter(item => item.playerId !== player.playerId)  // Deselect
            : [...prevSelected, player]  // Select
    );
    };
  
    const handleSearch = (event) => setSearchQuery(event.target.value);
  
    const filteredOptions = players.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="winner-selection-container">
        <div className="dropdown" onClick={toggleDropdown}>
          <div className="dropdown-selected">
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : "Select Players"}
          </div>
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
        </div>
    
        {isOpen && (
          <div className="dropdown-menu-winner">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="names">
              {filteredOptions.map((player) => (
                <div key={player.playerId} className="name">
                  <input
                    type="checkbox"
                    id={player.playerId}
                    checked={selectedOptions.includes(player)}
                    onChange={() => handleSelectOption(player)}
                  />
                  <label htmlFor={player.playerId}>{player.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}; 
export default WinnerSelection;