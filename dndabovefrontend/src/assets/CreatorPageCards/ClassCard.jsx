import { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import diceToInteger from "../CommonFunctions/diceToInteger";
import React, { useContext } from "react";
import { ClassIdContext } from "../BringSelectedClassId.jsx";
import "../Cards.css"; // Import styles

function ClassCard() {
  const [classOptions, setClassOptions] = useState();
  const [classFeatures, setClassFeatures] = useState();
  const [chosenClassId, setChosenClassId] = useState(0);
  const [classData, setClassData] = useState();

  const [subClassOptions, setSubClassOptions] = useState();
  const [subClassFeatures, setSubClassFeatures] = useState();
  const [subClassName, setSubClassName] = useState();
  const [chosenSubClassId, setChosenSubClassId] = useState(0);

  const [subFeatures, setSubFeatures] = useState([]);
  const [featureWithSubFeature, setFeatureWithSubFeature] = useState();
  const [chosenSubFeatures, setChosenSubFeatures] = useState([]); // Updated to store subfeatures in the array format
  const [subFeatureLimits, setSubFeatureLimits] = useState({}); // Tracks the max selections for each feature

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
      setClassData(await fetchEverything("Classes/" + chosenClassId));

      setClassFeatures(await fetchEverything("Features/Features/originclassid/" + chosenClassId));

      setSubClassFeatures(undefined);

      setSubClassName(undefined);
    }
    setSubFeatures([]);
    setChosenSubFeatures([]);
    setFeatureWithSubFeature("");
    setSelectedClassId(chosenClassId);

    fetchdatabyid();
  }, [chosenClassId]);

  useEffect(() => {
    if (classFeatures !== undefined) {
      classFeatures.forEach(async feature => {
        try {
          setSubFeatures(await fetchEverything("FeaturesToFeaturesConnections/" + feature.id));
          setFeatureWithSubFeature(feature.name);

          // Set the limit for the number of times a subfeature can be selected
          const limit = Math.min(feature.levelReq, characterLevel); // Example: if feature can appear 3 times at level 5, it will be 3
          setSubFeatureLimits(prev => ({
            ...prev,
            [feature.id]: limit
          }));
        } catch {
          null;
        }
      });
    }
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
    fetchsubclasses(chosenClassId);
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
    if (!tempSelected.some(subfeature => subfeature[0] === name && subfeature[2] === originfeatureid)) {
      tempSelected.push([name, description, originfeatureid]);
      setChosenSubFeatures(tempSelected);
    }
  }

  // Function to delete subfeature
  function subFeatureDelete(name, originfeatureid) {
    const tempSelected = chosenSubFeatures.filter(subfeature => !(subfeature[0] === name && subfeature[2] === originfeatureid));
    setChosenSubFeatures(tempSelected);
  }

  // Finalize the selections
  function finalizeSelection() {
    setFeatureDone(true);
  }

  // Revert selections (reset the state to previous values)
  function revertSelection() {
    setChosenSubFeatures([]);
    setFeatureDone(false);
  }

  function SelectedClass() {
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

        {/* Displaying each feature of the class loaded into the classFeatures array */}
        {classFeatures.map((feature, id) => (
          feature.levelReq <= characterLevel ? (
            <div className="selected-feature" key={id}>
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
              {feature.name === featureWithSubFeature ? (
                subFeatures.map((subfeature, subId) => {
                  const maxSubFeatures = subFeatureLimits[feature.id] || 1;
                  const alreadySelected = chosenSubFeatures.filter(sub => sub[2] === feature.id).length >= maxSubFeatures;

                  return (
                    <>
                      <p key={subId}><b>{subfeature.name}</b></p>
                      <p><b>Description: </b>{subfeature.description}</p>
                      <button
                        onClick={() => subFeatureAdd(subfeature.name, subfeature.description, feature.id)}
                        disabled={alreadySelected || chosenSubFeatures.filter(sub => sub[2] === feature.id).length >= maxSubFeatures}
                      >
                        Select {feature.name}
                      </button>
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

      {chosenClassId !== 0 ? (
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
        {Boolean(chosenClassId !== 0) && classFeatures !== undefined && classData !== undefined ? (
          <SelectedClass />
        ) : null}
      </div>
    </div>
  );
}

export default ClassCard;
