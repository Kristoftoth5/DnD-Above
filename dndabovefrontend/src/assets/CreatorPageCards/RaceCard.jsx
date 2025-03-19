import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import "../Cards.css"; // Import styles

function RaceCard() {


  const [selectedRaceId, setSelectedRaceId] = useState(""); // Stores selected race
  const [dropdownOpen, setDropdownOpen] = useState(false); // Tracks dropdown state
  const [raceOptionNames,setRaceOptionNames] = useState([]);
  const [raceOptionIds,setRaceOptionIds] = useState([]);
  const [chosenRace, setChosenRace] = useState("")

  useEffect(()=>{
    async function fetchdata()
    {
    const raceOptionsJSON = await fetchEverything("Races");

      var fasz = [];
      var fasz2 = [];
    raceOptionsJSON.forEach(race => {
      
      fasz2.push(race.name);
      fasz2.push(race.id);

      fasz.push(fasz2);

      fasz2 = [];

      
    });
    setRaceOptionNames(fasz);
    }

    fetchdata();
    
    
  },[]);


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
          onClick={() => {console.log(dropdownOpen);setDropdownOpen(!dropdownOpen);}}
          id="plsbepink"
        >
          Select Race
        </button>

        {/* Dropdown Menu - Now positioned below the button */}
        {console.log(dropdownOpen)}
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {raceOptionNames.map( (race, id) =>(
              <button
                className="dropdown-item"
                onClick={() => {setChosenRace(race[1]);setDropdownOpen(false);}}
              >
              {race[0]}
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