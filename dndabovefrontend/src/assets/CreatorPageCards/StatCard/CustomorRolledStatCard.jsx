import React, { useState } from "react";
import "../../Cards.css"; // Reuse existing styles
import "../../CommonFunctions/modCalc"
import modCalc from "../../CommonFunctions/modCalc";

function AbilityScores() {
  // State for each ability score and its modifier

  const [scores, setScores] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });


  // Function to handle input change
  const handleInputChange = (ability, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [ability]: value,
    }));
  };

  return (
    <div className="race-container"> {/* Reusing race-container design */}
      <h2 className="race-title">Ability Scores</h2>
      <h3 className="race-sub-title">Custom or Rolled</h3>

      {/* Six squares for each ability */}
      <div className="ability-grid">
        {Object.keys(scores).map((ability) => (
          <div key={ability} className="ability-box">
            <h3 className="ability-title">{ability}</h3>
            <div className="score-display">{scores[ability]}</div>
            <input
              type="number"
              min="8"
              max="18"
              className="score-input"
              value={scores[ability]}
              onChange={(e) => {handleInputChange(ability, e.target.value);setModifier(modCalc(scores[ability]))}}
            />
            <div className="modifier-display">
                {modCalc(scores[ability])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AbilityScores;