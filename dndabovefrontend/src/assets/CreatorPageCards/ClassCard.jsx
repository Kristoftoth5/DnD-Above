import { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import diceToInteger from "../CommonFunctions/diceToInteger";
import React, { useContext } from "react";
import { ClassIdContext } from "../SaveContexts/ClassContext.jsx";
import "../Cards.css"; // Import styles

function ClassCard() {
  const [classOptions, setClassOptions] = useState();
  const [classFeatures, setClassFeatures] = useState();
  const [chosenClassId, setChosenClassId] = useState(-1);
  const [classData, setClassData] = useState();

  const [subClassOptions, setSubClassOptions] = useState();
  const [subClassFeatures, setSubClassFeatures] = useState();
  const [subClassName, setSubClassName] = useState();
  const [chosenSubClassId, setChosenSubClassId] = useState(-1);

  const [subFeatures, setSubFeatures] = useState([]);
  const [featureWithSubFeature, setFeatureWithSubFeature] = useState("");
  const [chosenSubFeatures, setChosenSubFeatures] = useState([]); // Updated to store subfeatures in the array format
  const [subFeatureLimits, setSubFeatureLimits] = useState(0); // Tracks the max selections for each feature
  const [totalSubFeatureCount, setTotalSubFeatureCount] = useState(0); // Track total subfeature selections

  const [characterLevel, setCharacterLevel] = useState(1);

  const [subClassDropdownOpen, setSubClassDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { setSelectedClassId } = useContext(ClassIdContext);

  const [featureDone, setFeatureDone] = useState(false);

  // Fetching all the classes at startup
  useEffect(() => {
    async function fetchclasses() {
      const classOptionsJSON = await fetchEverything("Classes");

      var fasz = [];
      var fasz2 = [];
      classOptionsJSON.forEach(characterclass => {
        fasz2.push(characterclass.name);
        fasz2.push(characterclass.id);

        fasz.push(fasz2);
        fasz2 = [];
      });
      setClassOptions(fasz);
    }
    fetchclasses();
  }, []);

  useEffect(() => {
    async function fetchdatabyid() {
      try
      {
      setClassData(await fetchEverything("Classes/" + chosenClassId));

      setClassFeatures(await fetchEverything("Features/Features/originclassid/" + chosenClassId));

      setSubClassFeatures(undefined);

      setSubClassName(undefined);
      }
      catch
      {
        null;
      }
    }
    setSubFeatures([]);
    setChosenSubFeatures([]);
    setFeatureWithSubFeature("");
    setCharacterLevel(1);
    setSelectedClassId(chosenClassId);

    fetchdatabyid();
  }, [chosenClassId]);

  useEffect(() => {
    setSubFeatureLimits(0);
    setSubFeatures(undefined);
    setFeatureWithSubFeature("");
    var newSubFeatureLimits = 0;
    const fetchSubFeatures = async () => {
      if (classFeatures !== undefined) {
        const subFeaturePromises = classFeatures.map(async (feature) => {
          const subFeaturesConnections = await fetchEverything("FeaturesToFeaturesConnections/" + feature.id);
  
          if (subFeaturesConnections.length !== 0) {
            setSubFeatures(subFeaturesConnections);
            setFeatureWithSubFeature(feature.name);
          }
  
          if (feature.name === featureWithSubFeature && feature.levelReq <= characterLevel) {
            newSubFeatureLimits += 1;
          }
        });
  
        // Wait for all promises to resolve
        await Promise.all(subFeaturePromises);
  
        console.log("newSubFeatureLimits: ", newSubFeatureLimits); // This will show the correct value
        if (newSubFeatureLimits !== 0) {
          setSubFeatureLimits(newSubFeatureLimits);
        }
      }
    };
    fetchSubFeatures();
  }, [characterLevel, chosenClassId]);

  useEffect(() => {
    async function fetchsubclasses(id) {
      const subClassOptionsJSON = await fetchEverything("SubClasses/SubClasses/originclassid/" + id);
      var fasz = [];
      var fasz2 = [];
      subClassOptionsJSON.map((subclass, id) => {
        fasz2.push(subclass.name);
        fasz2.push(subclass.id);

        fasz.push(fasz2);
        fasz2 = [];
      });
      setSubClassOptions(fasz);
    }
    try
    {
      fetchsubclasses(chosenClassId);
    }
    catch
    {
      null;
    }
    
  }, [chosenClassId]);

  useEffect(() => {
    async function fetchsubclassfeatures(id) {
      setSubClassFeatures(await fetchEverything("Features/Features/originsubclassid/" + id));
    }

    var prevsubclassfeatures = subClassFeatures;

    if (chosenSubClassId !== 0) {
      fetchsubclassfeatures(chosenSubClassId);
    }

    if (prevsubclassfeatures == subClassFeatures) {
      setSubClassFeatures(undefined);
      prevsubclassfeatures = undefined;
    }
  }, [chosenSubClassId]);

  // Function to add subfeature
  function subFeatureAdd(name, description, originfeatureid) {
    const tempSelected = [...chosenSubFeatures];

    // Check if the feature is already added for this feature (to avoid duplicates)
    if (!tempSelected.some(subfeature => subfeature[0] === name && subfeature[2] === originfeatureid) && !(chosenSubFeatures.length >= subFeatureLimits)) {
      tempSelected.push([name, description, originfeatureid]);
      setChosenSubFeatures(tempSelected);
      setTotalSubFeatureCount(prev => prev + 1); // Increment the total subfeature count
    }
  }

  // Function to delete subfeature
  function subFeatureDelete(name, originfeatureid) {
    const tempSelected = chosenSubFeatures.filter(subfeature => !(subfeature[0] === name && subfeature[2] === originfeatureid));
    setChosenSubFeatures(tempSelected);
    setTotalSubFeatureCount(prev => prev - 1); // Decrement the total subfeature count
  }

  // Finalize the selections
  function finalizeSelection() {
    setFeatureDone(true);
  }

  // Revert selections (reset the state to previous values)
  function revertSelection() {
    setChosenSubFeatures([]);
    setTotalSubFeatureCount(0); // Reset the total subfeature count
    setFeatureDone(false);
  }

  function SelectedClass() {
    const displayedFeatures = new Set(); // Used to track which features have already been displayed
    const uniqueFeatures = [];

    // Filter out duplicate features by their name, but only show features that are level-appropriate
    if(classFeatures !== undefined)
    {
      classFeatures.forEach(feature => {
        if (feature.levelReq <= characterLevel && !displayedFeatures.has(feature.name)) {
          displayedFeatures.add(feature.name); // Track features by name
          uniqueFeatures.push(feature); // Add feature to uniqueFeatures list
        }
      });
    }
    

    // Update the total number of features based on eligible ones
    

    return (
      <>
        <p className="selected-singular">
          <b>Name: </b>{classData.name}
        </p>
        <p className="selected-singular">
          <b>Description: </b>{classData.description}
        </p>
        {classData.hitDice !== undefined ? (
          <p className="selected-singular">
            <b>Hit Dice: </b>{classData.hitDice}(or {diceToInteger(classData.hitDice) / 2 + 1})
          </p>
        ) : null}
        <p className="selected-singular">
          <b>Starting Gold: </b>{classData.startingGold}
        </p>

        {/* Displaying each unique feature */}
        {uniqueFeatures.map((feature, id) => (
          feature.levelReq <= characterLevel ? (
            <div className="selected-feature" key={id}>
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
              {feature.name === featureWithSubFeature ? (
                subFeatures.filter(subfeature => 
                  !chosenSubFeatures.some(chosen => chosen[0] === subfeature.name)
                ).map((subfeature, subId) => { // Only show subfeatures that aren't already selected
                  const maxSubFeatures = subFeatureLimits;
                  const alreadySelected = chosenSubFeatures.filter(sub => sub[2] === feature.id).length >= maxSubFeatures;

                  // If there is only one subfeature for this feature, we need to ensure that it can be selected
                  const featureIsAvailable = feature.levelReq <= characterLevel;

                  return (
                    <>
                      {featureIsAvailable && (
                        <>
                          <p key={subId}><b>{subfeature.name}</b></p>
                          <p><b>Description: </b>{subfeature.description}</p>
                          <button
                            onClick={() => {subFeatureAdd(subfeature.name, subfeature.description, feature.id); setTotalSubFeatureCount(totalSubFeatureCount+1)}}
                            disabled={alreadySelected || totalSubFeatureCount >= maxSubFeatures}
                          >
                            Select {subfeature.name}
                          </button>
                        </>
                      )}
                    </>
                  );
                })
              ) : null}
              {chosenSubFeatures.filter(sub => sub[2] === feature.id).length > 0 && (
                chosenSubFeatures.filter(sub => sub[2] === feature.id).map((chosensub, id) => (
                  <div key={id}>
                    <p><b>{chosensub[0]}</b></p>
                    <p>{chosensub[1]}</p>
                    <button onClick={() => subFeatureDelete(chosensub[0], feature.id)}>
                      Deselect {chosensub[0]}
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : null
        ))}

        {/* Finalize / Revert Buttons */}
        <div>
          {featureDone ? (
            <button onClick={revertSelection}>Revert Selection</button>
          ) : (
            <button onClick={finalizeSelection}>Finalize Subfeature Selection</button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="creator-container">
      <h2 className="creator-title">Class</h2>

      {chosenClassId !== -1 || chosenClassId !== undefined ? (
        <div className="ability-box">
          <h3 className="ability-title">Character Level</h3>
          <div className="score-display">{characterLevel}</div>

          {/* Increase & Decrease Buttons */}
          <div className="button-group">
            <button className="btn-stat" onClick={() => !((characterLevel + 1) > 20) ? setCharacterLevel(characterLevel + 1) : setCharacterLevel(characterLevel)}>+</button>
            <button className="btn-stat" onClick={() => (characterLevel - 1) !== 0 ? setCharacterLevel(characterLevel - 1) : setCharacterLevel(characterLevel)}>-</button>
          </div>
        </div>
      ) : null}

      {/* Dropdown Button */}
      <div className="dropdown-wrapper">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => { setDropdownOpen(!dropdownOpen); }}
          id="plsbepink"
        >
          Select Class
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {classOptions.map((characterclass, id) => (
              <button
                className="dropdown-item"
                onClick={() => { setChosenClassId(characterclass[1]); setDropdownOpen(false); }}
                key={id}
              >
                {characterclass[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="selected-multiple">
        {Boolean(chosenClassId !== -1 || chosenClassId !== undefined) && classFeatures !== undefined && classData !== undefined ? (
          <SelectedClass />
        ) : null}
      </div>
    </div>
  );
}

export default ClassCard;
