import React, { useState, useEffect, useContext } from "react";
import "../../Cards.css"; // Reuse existing styles
import modCalc from "../../CommonFunctions/modCalc";
import { StatsContext } from "../../SaveContexts/StatContext";

function AbilityScores() {
  const [scores, setScores] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });

  const [bonuses, setBonuses] = useState({
    plus2: null, // Tracks which stat got +2
    plus1: null, // Tracks which stat got +1
  });

  const [availableBonuses, setAvailableBonuses] = useState({ plus2: true, plus1: true });

  const { setStats } = useContext(StatsContext)

  useEffect(() => {
    const updatedArray = Object.keys(scores).map((ability) => getFinalScore(ability));
    setStats(updatedArray);
  }, [scores, bonuses]);

  const handleInputChange = (ability, value) => {
    let intValue = parseInt(value);
    if (isNaN(intValue)) return;

    // Ensure manual input stays within 8-18 range
    intValue = Math.min(Math.max(intValue, 8), 18);

    setScores((prevScores) => ({
      ...prevScores,
      [ability]: intValue,
    }));
  };

  const handleDrop = (event, ability) => {
    const bonusType = event.dataTransfer.getData("bonusType");
    if (!bonusType || bonuses[bonusType]) return; // Prevent duplicate bonuses on same stat

    setBonuses((prev) => ({ ...prev, [bonusType]: ability })); // Assign bonus to the stat
    setAvailableBonuses((prev) => ({ ...prev, [bonusType]: false })); // Remove bonus from selection
  };

  const handleRemoveBonus = (ability) => {
    const updatedBonuses = { ...bonuses };
    if (bonuses.plus2 === ability) {
      updatedBonuses.plus2 = null;
      setAvailableBonuses((prev) => ({ ...prev, plus2: true }));
    } else if (bonuses.plus1 === ability) {
      updatedBonuses.plus1 = null;
      setAvailableBonuses((prev) => ({ ...prev, plus1: true }));
    }
    setBonuses(updatedBonuses);
  };

  const getFinalScore = (ability) => {
    let baseScore = scores[ability];
    if (bonuses.plus2 === ability) return Math.min(baseScore + 2, 20);
    if (bonuses.plus1 === ability) return Math.min(baseScore + 1, 19);
    return baseScore;
  };

  return (
    <>
    <div className="creator-container">
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">Custom or Rolled</h3>

      <div className="ability-grid">
        {Object.keys(scores).map((ability) => {
          const isRed = bonuses.plus2 === ability || bonuses.plus1 === ability; // Highlight if stat has bonus
          return (
            <div 
              key={ability} 
              className="ability-box"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, ability)}
            >
              <h3 className="ability-title">{ability}</h3>
              <div 
                className={`score-display ${isRed ? "bonus-highlight" : ""}`}
                onClick={() => isRed && handleRemoveBonus(ability)} // Click to remove bonus
              >
                {getFinalScore(ability)}
              </div>
              <input
                type="number"
                min="8"
                max="18"
                className="score-input"
                value={scores[ability]}
                onChange={(e) => handleInputChange(ability, e.target.value)}
              />
              <div className="modifier-display">
                {modCalc(getFinalScore(ability))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus Drag Items */}
      {(availableBonuses.plus2 || availableBonuses.plus1) && (
        <div className="bonus-container">
          {availableBonuses.plus2 && (
            <div 
              className="bonus-item" 
              draggable 
              onDragStart={(e) => e.dataTransfer.setData("bonusType", "plus2")}
            >
              +2
            </div>
          )}
          {availableBonuses.plus1 && (
            <div 
              className="bonus-item" 
              draggable 
              onDragStart={(e) => e.dataTransfer.setData("bonusType", "plus1")}
            >
              +1
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default AbilityScores;