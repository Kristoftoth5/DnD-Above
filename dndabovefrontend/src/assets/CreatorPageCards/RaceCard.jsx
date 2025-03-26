import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import "../Cards.css"; // Import styles

function RaceCard() {


  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [subRaceDropdownOpen, setSubRaceDropdownOpen] = useState(false);
  const [raceOptionNames,setRaceOptionNames] = useState([]);
  const [chosenRaceId, setChosenRaceId] = useState(0);
  const [chosenSubRaceId, setChosenSubRaceId] = useState(0);
  const [raceData, setRaceData] = useState();
  const [subRaceName, setSubRaceName] = useState();
  const [raceFeatures, setRaceFeatures] = useState();
  const [subRaceOptions, setSubRaceOptions] = useState();
  const [subRaceFeatures, setSubRaceFeatures] = useState();

 


 /*Fetching all the races at startup */
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

  /*Fetching a specific, chosen Race's features */
  useEffect(()=>{
    async function fetchdatabyid() 
    {
      setRaceData(await fetchEverything("Races/"+chosenRaceId));

      setRaceFeatures(await fetchEverything("Features/Features/originraceid/"+chosenRaceId));
    }
    fetchdatabyid()
  },[chosenRaceId])

  /*Fetching the subraces of a race if it has them */
  useEffect(()=>{
    async function fetchsubracethings(id)
    {
      const subRaceOptionsJSON = await fetchEverything("FeaturesToFeaturesConnections/"+id);

      var fasz = [];
      var fasz2 = [];
    subRaceOptionsJSON.forEach(subrace => {
      fasz2.push(subrace.name);
      fasz2.push(subrace.id);

      fasz.push(fasz2);
      fasz2 = [];
    });
    setSubRaceOptions(fasz);
    }

    var prevsubraceoptions = subRaceOptions;
    var subracefeature
    if(raceFeatures !== undefined)
    {
      subracefeature = raceFeatures.find(feature => feature.name === "Subrace");
    }

    var prevsubraceoptions;
    
    if (subracefeature) {
      fetchsubracethings(subracefeature.id);
    }
    

    if (prevsubraceoptions == subRaceOptions)
    {
      setSubRaceOptions(undefined);
      prevsubraceoptions = undefined;
    }
  },[raceFeatures])

  /*Fetching the features of the subrace if there was one */
  useEffect(()=>{
    async function fetchsubracefeatures(id)
    {
      setSubRaceFeatures(await fetchEverything("FeaturesToFeaturesConnections/"+id));
    }
    

    var prevsubracefeatures = subRaceFeatures;
    
    if(chosenSubRaceId !== 0)
    {
      fetchsubracefeatures(chosenSubRaceId);
    }


    if (prevsubracefeatures == subRaceOptions)
    {
      setSubRaceFeatures(undefined);
      prevsubracefeatures = undefined;
    }
  },[chosenSubRaceId])


    function SelectedRace() {
      return (
        <>
          <p className="selected-singular"><b>Name: </b>{raceData.name}</p>
          <p className="selected-singular"><b>Age: </b>{raceData.age}</p>
          <p className="selected-singular"><b>Size: </b>{raceData.size}</p>
          <p className="selected-singular"><b>Speed: </b>{raceData.speed}</p>
  
          {raceFeatures.map((feature, id)=>(
            <div className="selected-feature">
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
              
  
              {/*The subrace features are being displayed at the next selected race. WTF*/} 
            </div>
          ))}
          <h3>Subrace Options</h3>
          {subRaceOptions !== undefined & chosenSubRaceId == 0 && (
            <div className="dropdown-wrapper">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button"
              onClick={() => {setSubRaceDropdownOpen(!subRaceDropdownOpen);}}
              id="plsbepink"
            >
              Select Race
            </button>
    
            {/* Dropdown Menu - Now positioned below the button */}
            {subRaceDropdownOpen && (
              <div className="dropdown-menu show">
                {subRaceOptions.map( (subrace, id) =>(
                  <button
                    className="dropdown-item"
                    onClick={() => {setChosenSubRaceId(subrace[1]);setSubRaceDropdownOpen(false);setSubRaceName(subrace[0]);}}
                  >
                  {subrace[0]}
                  </button>
                  ))}
              </div>
            )}
          </div>)}
          {subRaceFeatures !== undefined & chosenSubRaceId !== 0 && (
            subRaceFeatures.map((feature, id)=>(
              <div className="selected-feature">
                <p><b>{feature.name}</b></p>
                <p><b>Description: </b>{feature.description}</p>
              </div>
            ))
          )}
            
          {subRaceOptions === undefined & subRaceFeatures === undefined && (
            <p>No Subraces available.</p>
          )}
  
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
                onClick={() => {setChosenRaceId(race[1]);setDropdownOpen(false);setChosenSubRaceId(0);}}
              >
              {race[0]}
              </button>
              ))}
          </div>
        )}
      </div>

      
      <div className="selected-multiple">
        {chosenRaceId != 0 & raceFeatures !== undefined &&(
          <SelectedRace/>)}
      </div>
    </div>
  );
}

export default RaceCard;