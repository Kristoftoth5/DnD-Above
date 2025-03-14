import React, { useState } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import "../Cards.css"; // Import styles

function RaceCard() {
    const [selectedRaceId, setSelectedRaceId] = useState(""); // Stores selected race
  const [dropdownOpen, setDropdownOpen] = useState(false); // Tracks dropdown state
  const [raceOptionNames, setRaceOptionNames] = useState([]);

  // Dummy options for the dropdown (replace with actual race data)
  const raceOptionsJSON = fetchEverything("Races");
  Array.from(raceOptionsJSON).forEach(race => {
    console.log(race.Name);
  });

  const [chosenRace, setChosenRace] = useState("")

  // Handles selection and updates state
  /*const handleSelectRace = (race) => {
    if (!selectedRaces.includes(race)) {
      setSelectedRaces([...selectedRaces, race]);
    }
    setDropdownOpen(false); // Close dropdown after selection
  };*/

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
            {raceOptionNames.map((race, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => {setChosenRace(race);setDropdownOpen(false)}}
              >
                {race}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Display Selected Races BELOW the dropdown */}
      <div className="selected-races">
        <p className="selected-race">{chosenRace}</p>
      </div>
    </div>
  );
}

export default RaceCard;