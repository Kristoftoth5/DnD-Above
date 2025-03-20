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
    let currentScore = scores[ability];
  
    // Check if we can increase
    if (currentScore < 15) {
      let cost = currentScore >= 13 ? 2 : 1; // Cost 2 points if 13+
  
      if (pointPool >= cost) {
        setScores((prevScores) => ({
          ...prevScores,
          [ability]: currentScore + 1,
        }));
        setPointPool(pointPool - cost);
      }
    }
  };
  
  // Function to handle decreasing an ability score
  const decreaseStat = (ability) => {
    let currentScore = scores[ability];
  
    // Check if we can decrease
    if (currentScore > 8) {
      let refund = currentScore > 13 ? 2 : 1; // Refund 2 points if above 13
  
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: currentScore - 1,
      }));
      setPointPool(pointPool + refund);
    }
  };

  return (
    <div className="creator-container"> {/* Reusing race-container design */}
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">
        Point Buy &nbsp; <span className="point-pool">Points Left: {pointPool}</span>
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