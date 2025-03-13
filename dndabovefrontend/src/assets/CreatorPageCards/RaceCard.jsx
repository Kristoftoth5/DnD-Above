import React, { useState } from "react";
import "../Cards.css"; // Import styles

function RaceCard() {
    const [selectedRaces, setSelectedRaces] = useState([]); // Stores selected races
  const [dropdownOpen, setDropdownOpen] = useState(false); // Tracks dropdown state

  // Dummy options for the dropdown (replace with actual race data)
  const raceOptions = ["Elf", "Dwarf", "Human", "Orc", "Tiefling"];

  // Handles selection and updates state
  const handleSelectRace = (race) => {
    if (!selectedRaces.includes(race)) {
      setSelectedRaces([...selectedRaces, race]);
    }
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="race-container">
      <h2 className="race-title">Races</h2>

      {/* Dropdown Button */}
      <div className="dropdown-wrapper">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          id="plsbepink"
        >
          Select Race
        </button>

        {/* Dropdown Menu - Now positioned below the button */}
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {raceOptions.map((race, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleSelectRace(race)}
              >
                {race}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Display Selected Races BELOW the dropdown */}
      <div className="selected-races">
        {selectedRaces.map((race, index) => (
          <p key={index} className="selected-race">{race}</p>
        ))}
      </div>
    </div>
  );
}

export default RaceCard;