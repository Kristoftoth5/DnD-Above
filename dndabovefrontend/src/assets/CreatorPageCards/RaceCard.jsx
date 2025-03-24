import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import "../Cards.css"; // Import styles

function RaceCard() {


  const [dropdownOpen, setDropdownOpen] = useState(false); // Tracks dropdown state
  const [raceOptionNames,setRaceOptionNames] = useState([]);
  const [chosenRaceId, setChosenRaceId] = useState(0);
  const [raceData, setRaceData] = useState();

 



  useEffect(()=>{
    async function fetchraces()
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
    fetchraces();
  },[]);

  useEffect(()=>{
    async function fetchdatabyid() 
    {
      setRaceData(await fetchEverything("Races/"+chosenRaceId));

      
    }
    fetchdatabyid()

  },[chosenRaceId])

  
  function SelectedRace() {
    return (
      <>
        <p className="selected-singular"><b>Name: </b>{raceData.name}</p>
        <p className="selected-singular"><b>Age: </b>{raceData.age}</p>
        <p className="selected-singular"><b>Size: </b>{raceData.size}</p>
        <p className="selected-singular"><b>Speed: </b>{raceData.speed}</p>
      </>
    )
  }


  

  return (
    <div className="creator-container">
      <h2 className="creator-title">Races</h2>

      {/* Dropdown Button */}
      <div className="dropdown-wrapper">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          onClick={() => {setDropdownOpen(!dropdownOpen);}}
          id="plsbepink"
        >
          Select Race
        </button>

        {/* Dropdown Menu - Now positioned below the button */}
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {raceOptionNames.map( (race, id) =>(
              <button
                className="dropdown-item"
                onClick={() => {setChosenRaceId(race[1]);setDropdownOpen(false);console.log("chosenRaceId: "+chosenRaceId);}}
              >
              {race[0]}
              </button>
              ))}
          </div>
        )}
      </div>

      {/* Display Selected Races BELOW the dropdown */}
      <div className="selected-multiple">
        {chosenRaceId != 0 &&(
          <SelectedRace/>)}
      </div>
    </div>
  );
}

export default RaceCard;