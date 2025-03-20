import React, { useState } from "react";
import "../../Cards.css"; // Reuse existing styles
import modCalc from "../../CommonFunctions/modCalc";

function AbilityScores() {
  const [pointPool, setPointPool] = useState(27); // Total available points

  // State for ability scores
  const [scores, setScores] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });

  // Function to handle increasing an ability score
  const increaseStat = (ability) => {
    if (pointPool > 0 && scores[ability] < 18) {
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: prevScores[ability] + 1,
      }));
      setPointPool(pointPool - 1);
    }
  };

  // Function to handle decreasing an ability score
  const decreaseStat = (ability) => {
    if (scores[ability] > 8) {
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: prevScores[ability] - 1,
      }));
      setPointPool(pointPool + 1);
    }
  };

  return (
    <div className="creator-container"> {/* Reusing race-container design */}
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">
        Heroic Point Buy &nbsp; <span className="point-pool">Points Left: {pointPool}</span>
      </h3>

      {/* Ability Score Grid */}
      <div className="ability-grid">
        {Object.keys(scores).map((ability) => (
          <div key={ability} className="ability-box">
            <h3 className="ability-title">{ability}</h3>
            <div className="score-display">{scores[ability]}</div>

            {/* Increase & Decrease Buttons */}
            <div className="button-group">
              <button className="btn-stat" onClick={() => increaseStat(ability)}>+</button>
              <button className="btn-stat" onClick={() => decreaseStat(ability)}>-</button>
            </div>

            {/* Display Modifier */}
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