import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import "../Cards.css"; // Import styles

function RaceCard() {


  const [dropdownOpen, setDropdownOpen] = useState(false); // Tracks dropdown state
  const [raceOptionNames,setRaceOptionNames] = useState([]);
  const [chosenRaceId, setChosenRaceId] = useState(0);
  const [raceChosen, setRaceChosen] = useState(false);
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

  },[raceChosen])

  
  function SelectedRace() {
    return (
      <>
        <p className="selected-race"><b>Name: </b>{raceData.name}</p>
        <p className="selected-race"><b>Age: </b>{raceData.age}</p>
        <p className="selected-race"><b>Size: </b>{raceData.size}</p>
        <p className="selected-race"><b>Speed: </b>{raceData.speed}</p>
      </>
    )
  }


  

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
                onClick={() => {setChosenRaceId(race[1]);setDropdownOpen(false);setRaceChosen(true);}}
              >
              {race[0]}
              </button>
              ))}
          </div>
        )}
      </div>

      {/* Display Selected Races BELOW the dropdown */}
      <div className="selected-races">
        {raceChosen &&(
          <SelectedRace/>)}
      </div>
    </div>
  );
}

export default RaceCard;