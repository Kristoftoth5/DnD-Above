import React, { useState, useEffect, useContext } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import diceToInteger from "../CommonFunctions/diceToInteger";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext, BasicClassFeatureIdContext, FinalCharacterLevelContext, CasterContext, HalfcasterContext } from "../SaveContexts/ClassContext";
import "../Cards.css";

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
  const [chosenSubFeatures, setChosenSubFeatures] = useState([]);
  const [subFeatureLimits, setSubFeatureLimits] = useState(0);
  const [totalSubFeatureCount, setTotalSubFeatureCount] = useState(0);

  const [characterLevel, setCharacterLevel] = useState(1);

  const [subClassDropdownOpen, setSubClassDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [featureDone, setFeatureDone] = useState(false);

  const { setClassId } = useContext(ClassIdContext);
  const { setSubclassId } = useContext(SubclassIdContext);
  const { setChosenClassFeatureId } = useContext(ChosenClassFeatureIdContext);
  const { setBasicClassFeatureId } = useContext(BasicClassFeatureIdContext);
  const { setFinalCharacterLevel } = useContext(FinalCharacterLevelContext)
  const { setCaster } = useContext(CasterContext)
  const { setHalfcaster } = useContext(HalfcasterContext)

  useEffect(() => {
    async function fetchclasses() {
      const classOptionsJSON = await fetchEverything("Classes");

      const temp = classOptionsJSON.map(characterclass => [characterclass.name, characterclass.id]);
      setClassOptions(temp);
    }
    fetchclasses();
  }, []);

  useEffect(() => {
    async function fetchdatabyid() {
      try {
        setClassData(await fetchEverything("Classes/" + chosenClassId));
        setClassFeatures(await fetchEverything("Features/originclassid/" + chosenClassId));
        setSubClassFeatures(undefined);
        setSubClassName(undefined);
      } catch {
        null;
      }
    }

    setSubFeatures([]);
    setChosenSubFeatures([]);
    setFeatureWithSubFeature("");
    setCharacterLevel(1);
    setFinalCharacterLevel(1);

    fetchdatabyid();



  }, [chosenClassId]);

  useEffect(() => {
    setSubFeatureLimits(1);
    setSubFeatures(undefined);
    setFeatureWithSubFeature("");
    let newSubFeatureLimits = 0;

    const fetchSubFeatures = async () => {
      if (classFeatures !== undefined) {
        const subFeaturePromises = classFeatures.map(async (feature) => {
          const subFeaturesConnections = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/" + feature.id);

          if (subFeaturesConnections.length !== 0) {
            setSubFeatures(subFeaturesConnections);
            setFeatureWithSubFeature(feature.name);
          }

          if (feature.name === featureWithSubFeature && feature.levelReq <= characterLevel) {
            newSubFeatureLimits += 1;
          }
        });

        await Promise.all(subFeaturePromises);

        if (newSubFeatureLimits !== 0) {
          setSubFeatureLimits(newSubFeatureLimits);
        }
      }
    };

    fetchSubFeatures();
  }, [characterLevel, chosenClassId]);

  useEffect(() => {
    async function fetchsubclasses(id) {
      const subClassOptionsJSON = await fetchEverything("SubClasses/originclassid/" + id);
      const temp = subClassOptionsJSON.map(subclass => [subclass.name, subclass.id]);
      setSubClassOptions(temp);
    }

    try {
      fetchsubclasses(chosenClassId);
    } catch {
      null;
    }
  }, [chosenClassId]);

  useEffect(() => {
    async function fetchsubclassfeatures(id) {
      setSubClassFeatures(await fetchEverything("Features/originsubclassid/" + id));
    }

    const prevsubclassfeatures = subClassFeatures;

    if (chosenSubClassId !== 0) {
      fetchsubclassfeatures(chosenSubClassId);
    }

    if (prevsubclassfeatures === subClassFeatures) {
      setSubClassFeatures(undefined);
    }
  }, [chosenSubClassId]);

  function subFeatureAdd(name, description, originfeatureid, featureid) {
    const tempSelected = [...chosenSubFeatures];

    if (!tempSelected.some(subfeature => subfeature[0] === name && subfeature[2] === originfeatureid) && !(chosenSubFeatures.length >= subFeatureLimits)) {
      tempSelected.push([name, description, originfeatureid, featureid]);
      setChosenSubFeatures(tempSelected);
      setTotalSubFeatureCount(prev => prev + 1);
    }
  }

  function subFeatureDelete(name, originfeatureid) {
    const tempSelected = chosenSubFeatures.filter(subfeature => !(subfeature[0] === name && subfeature[2] === originfeatureid));
    setChosenSubFeatures(tempSelected);
    setTotalSubFeatureCount(prev => prev - 1);
  }

  function finalizeSelection() {
    setFeatureDone(true);

    const chosenSubFeatureIds = chosenSubFeatures.map(sub => sub[3]);
    setChosenClassFeatureId(chosenSubFeatureIds);

    if (classFeatures !== undefined) {
      const autoFeatureIds = classFeatures
        .filter(feature => {
          const hasSub = feature.name === featureWithSubFeature;
          return feature.levelReq <= characterLevel && !hasSub;
        })
        .map(feature => feature.id);

      setBasicClassFeatureId(autoFeatureIds);
    }
  }

  function revertSelection() {
    setChosenSubFeatures([]);
    setTotalSubFeatureCount(0);
    setFeatureDone(false);
    setChosenClassFeatureId([]);
    setBasicClassFeatureId([]);
  }

  function SelectedClass() {
    const displayedFeatures = new Set();
    const uniqueFeatures = [];

    if (classFeatures !== undefined) {
      classFeatures.forEach(feature => {
        if (feature.levelReq <= characterLevel && !displayedFeatures.has(feature.name)) {
          displayedFeatures.add(feature.name);
          uniqueFeatures.push(feature);
        }
      });
    }

    return (
      <>
        <p className="selected-singular"><b>Name: </b>{classData.name}</p>
        <p className="selected-singular"><b>Caster: </b>{classData.spellCaster}</p>
        {classData.hitDice && (
          <p className="selected-singular"><b>Hit Dice: </b>{classData.hitDice}(or {diceToInteger(classData.hitDice) / 2 + 1})</p>
        )}
        <p className="selected-singular"><b>Starting Gold: </b>{classData.startingGold}</p>

        {uniqueFeatures.map((feature, id) => (
          feature.levelReq <= characterLevel && (
            <div className="selected-feature" key={id}>
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
              {feature.name === featureWithSubFeature && Array.isArray(subFeatures) &&
                subFeatures.filter(sub => !chosenSubFeatures.some(chosen => chosen[0] === sub.name)).map((subfeature, subId) => {
                  const maxSubFeatures = subFeatureLimits;
                  const alreadySelected = chosenSubFeatures.filter(sub => sub[2] === feature.id).length >= maxSubFeatures;
                  return (
                    <div key={subId}>
                      <p><b>{subfeature.name}</b></p>
                      <p><b>Description: </b>{subfeature.description}</p>
                      <button
                        onClick={() => subFeatureAdd(subfeature.name, subfeature.description, feature.id, subfeature.id)}
                        disabled={alreadySelected || totalSubFeatureCount >= maxSubFeatures}
                      >
                        Select {subfeature.name}
                      </button>
                    </div>
                  );
                })
              }
              {chosenSubFeatures.filter(sub => sub[2] === feature.id).map((chosensub, id) => (
                <div key={id}>
                  <p><b>{chosensub[0]}</b></p>
                  <p>{chosensub[1]}</p>
                  <button onClick={() => subFeatureDelete(chosensub[0], feature.id)}>
                    Deselect {chosensub[0]}
                  </button>
                </div>
              ))}
            </div>
          )
        ))}

        <div className="dropdown-wrapper">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={() => setSubClassDropdownOpen(!subClassDropdownOpen)}
            id="plsbepink"
          >
            Select Subclass
          </button>

          {subClassDropdownOpen && (
            <div className="dropdown-menu show">
              {subClassOptions.map((subclass, id) => (
                <button
                  className="dropdown-item"
                  key={id}
                  onClick={() => {
                    setChosenSubClassId(subclass[1]);
                    setSubclassId(subclass[1]);
                    setSubClassDropdownOpen(false);
                  }}
                >
                  {subclass[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {subClassFeatures && subClassFeatures.map((feature, id) => (
          feature.levelReq <= characterLevel && (
            <div className="selected-feature" key={id}>
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
            </div>
          )
        ))}

        <div>
          {featureDone ? (
            <button onClick={revertSelection}>Revert Selection</button>
          ) : (
            <button onClick={finalizeSelection}>Finalize Selection</button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="creator-container">
      <h2 className="creator-title">Class</h2>

      {chosenClassId !== -1 && (
        <div className="ability-box">
          <h3 className="ability-title">Character Level</h3>
          <div className="score-display">{characterLevel}</div>
          <div className="button-group">
            <button className="btn-stat" onClick={() => {setCharacterLevel(prev => Math.min(20, prev + 1));setFinalCharacterLevel(prev => Math.min(20, prev + 1))}}>+</button>
            <button className="btn-stat" onClick={() => {setCharacterLevel(prev => Math.max(1, prev - 1));setFinalCharacterLevel(prev => Math.max(1, prev - 1))}}>-</button>
          </div>
        </div>
      )}

      <div className="dropdown-wrapper">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          id="plsbepink"
        >
          Select Class
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu show">
            {classOptions.map((characterclass, id) => (
              <button
                className="dropdown-item"
                key={id}
                onClick={() => {
                  setChosenClassId(characterclass[1]);
                  setClassId(characterclass[1]);
                  setDropdownOpen(false);
                }}
              >
                {characterclass[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="selected-multiple">
        {chosenClassId !== -1 && classFeatures && classData ? (
          <SelectedClass />
        ): null}
        {classData !== undefined ? setCaster(classData.spellCaster) : null}
        {classData !== undefined ? setHalfcaster(classData.halfCaster) : null}
      </div>
    </div>
  );
}

export default ClassCard;
