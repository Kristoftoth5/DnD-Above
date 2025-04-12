import React, { useState, useEffect, useContext } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import "../Cards.css";
import { RaceIdContext } from "../SaveContexts/RaceContext";
import { SubraceIdContext, SubraceFeatureIdContext } from "../SaveContexts/RaceContext";

function RaceCard() {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [subRaceDropdownOpen, setSubRaceDropdownOpen] = useState(false);
  const [raceOptionNames, setRaceOptionNames] = useState([]);
  const [chosenRaceId, setChosenRaceId] = useState(0);
  const [chosenSubRaceId, setChosenSubRaceId] = useState(0);
  const [raceData, setRaceData] = useState();
  const [subRaceName, setSubRaceName] = useState();
  const [raceFeatures, setRaceFeatures] = useState();
  const [subRaceOptions, setSubRaceOptions] = useState();
  const [subRaceFeatures, setSubRaceFeatures] = useState();

  const { setSelectedRaceId } = useContext(RaceIdContext);
  const { setSelectedSubraceId } = useContext(SubraceIdContext);
  const { setSubraceFeatureId } = useContext(SubraceFeatureIdContext);

  useEffect(() => {
    async function fetchraces() {
      const raceOptionsJSON = await fetchEverything("Races");
      const formatted = raceOptionsJSON.map(race => [race.name, race.id]);
      setRaceOptionNames(formatted);
    }
    fetchraces();
  }, []);

  useEffect(() => {
    async function fetchdatabyid() {
      const race = await fetchEverything("Races/" + chosenRaceId);
      const features = await fetchEverything("Features/originraceid/" + chosenRaceId);
      setRaceData(race);
      setRaceFeatures(features);
    }
    if (chosenRaceId !== 0) fetchdatabyid();
  }, [chosenRaceId]);

  useEffect(() => {
    async function fetchsubracethings(id) {
      const subRaceOptionsJSON = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/" + id);
      const formatted = subRaceOptionsJSON.map(subrace => [subrace.name, subrace.id]);
      setSubRaceOptions(formatted);
    }

    if (raceFeatures) {
      const subraceFeature = raceFeatures.find(f => f.name === "Subrace");
      if (subraceFeature) {
        fetchsubracethings(subraceFeature.id);
      } else {
        setSubRaceOptions(undefined);
        setSubRaceName("");
      }
    }
  }, [raceFeatures]);

  function SelectedRace() {
    return (
      <>
        <p className="selected-singular"><b>Name: </b>{raceData.name}</p>
        <p className="selected-singular"><b>Age: </b>{raceData.age}</p>
        <p className="selected-singular"><b>Size: </b>{raceData.size}</p>
        <p className="selected-singular"><b>Speed: </b>{raceData.speed}</p>

        {raceFeatures.map((feature, id) => (
          feature.name !== "Subrace" ? (
            <div key={id} className="selected-feature">
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
            </div>
          ) : null
        ))}

        <h3>Subrace Options</h3>

        {subRaceOptions !== undefined && (
          <div className="dropdown-wrapper">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button"
              onClick={() => setSubRaceDropdownOpen(!subRaceDropdownOpen)}
              id="plsbepink"
            >
              Select Subrace
            </button>

            {subRaceDropdownOpen && (
              <div className="dropdown-menu show">
                {subRaceOptions.map((subrace, id) => (
                  <button
                    key={id}
                    className="dropdown-item"
                    onClick={async () => {
                      const subraceId = subrace[1];
                      const subraceName = subrace[0];

                      setChosenSubRaceId(subraceId);
                      setSubRaceDropdownOpen(false);
                      setSubRaceName(subraceName);
                      setSelectedSubraceId(subraceId);

                      const features = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/" + subraceId);
                      setSubRaceFeatures(features);

                      const featureIds = features.map(f => f.id);
                      setSubraceFeatureId(featureIds);

                    }}
                  >
                    {subrace[0]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {subRaceFeatures !== undefined && (
          <>
            <h4>{subRaceName}</h4>
            {subRaceFeatures.map((feature, id) => (
              <div key={id} className="selected-feature">
                <p><b>{feature.name}</b></p>
                <p><b>Description: </b>{feature.description}</p>
              </div>
            ))}
          </>
        )}

        {subRaceOptions === undefined && subRaceFeatures === undefined && (
          <p>No Subraces available.</p>
        )}
      </>
    );
  }

  return (
    <div className="creator-container">
      <h2 className="creator-title">Race</h2>

      <div className="dropdown-wrapper">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          id="plsbepink"
        >
          Select Race
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu show">
            {raceOptionNames.map((race, id) => (
              <button
                key={id}
                className="dropdown-item"
                onClick={() => {
                  setChosenRaceId(race[1]);
                  setDropdownOpen(false);
                  setChosenSubRaceId(0);
                  setSelectedRaceId(race[1]);
                  setSubRaceFeatures(undefined);
                  setSubraceFeatureId([]); // Clear context on new race
                }}
              >
                {race[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="selected-multiple">
        {chosenRaceId !== 0 && raceFeatures !== undefined && <SelectedRace />}
      </div>
    </div>
  );
}

export default RaceCard;
