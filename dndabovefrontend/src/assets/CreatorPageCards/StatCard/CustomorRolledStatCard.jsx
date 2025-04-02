import React, { useState } from "react";
import "../../Cards.css"; // Reuse existing styles
import "../../CommonFunctions/modCalc";
import modCalc from "../../CommonFunctions/modCalc";

function AbilityScores() {
  const [scores, setScores] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });

  const [availableBonuses, setAvailableBonuses] = useState({ plus2: true, plus1: true });
  const [bonusApplied, setBonusApplied] = useState({}); // Tracks where bonuses are applied

  const handleInputChange = (ability, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [ability]: parseInt(value),
    }));
  };

  const handleDrop = (event, ability) => {
    const bonusType = event.dataTransfer.getData("bonusType");
    if (!bonusType || bonusApplied[ability]) return; // Prevent multiple bonuses on the same stat

    const bonusValue = bonusType === "plus2" ? 2 : 1;
    
    setScores((prevScores) => ({
      ...prevScores,
      [ability]: prevScores[ability] + bonusValue,
    }));

    setBonusApplied((prev) => ({ ...prev, [ability]: bonusType })); // Mark ability as having received a bonus
    setAvailableBonuses((prev) => ({ ...prev, [bonusType]: false })); // Remove bonus from selection
  };

  return (
    <div className="creator-container">
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">Custom or Rolled</h3>

      <div className="ability-grid">
        {Object.keys(scores).map((ability) => (
          <div 
            key={ability} 
            className="ability-box"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, ability)}
          >
            <h3 className="ability-title">{ability}</h3>
            <div className="score-display">{scores[ability]}</div>
            <input
              type="number"
              min="8"
              max="18"
              className="score-input"
              value={scores[ability]}
              onChange={(e) => handleInputChange(ability, e.target.value)}
            />
            <div className="modifier-display">
              {modCalc(scores[ability])}
            </div>
          </div>
        ))}
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
  );
}

export default AbilityScores;