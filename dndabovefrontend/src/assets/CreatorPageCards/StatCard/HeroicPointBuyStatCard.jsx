import React, { useState, useEffect, useContext } from "react";
import "../../Cards.css"; // Reuse existing styles
import modCalc from "../../CommonFunctions/modCalc";
import { StatsContext } from "../../SaveContexts/StatContext";

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

  // Track how many times each stat has been increased
  const [increaseCount, setIncreaseCount] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
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

  // Function to handle increasing an ability score
  const increaseStat = (ability) => {
    const baseCap = 18;
    const maxCap = bonuses.plus2 === ability ? 20 : bonuses.plus1 === ability ? 19 : baseCap;

    // Only allow increasing if not at the increase limit (10 times) and point pool is available
    if (increaseCount[ability] < 10 && pointPool > 0 && scores[ability] < maxCap) {
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: prevScores[ability] + 1,
      }));
      setIncreaseCount((prevCount) => ({
        ...prevCount,
        [ability]: prevCount[ability] + 1,
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
      setIncreaseCount((prevCount) => ({
        ...prevCount,
        [ability]: Math.max(prevCount[ability] - 1, 0), // Don't allow going below 0 increases
      }));
      setPointPool(pointPool + 1);
    }
  };

  const handleDrop = (event, ability) => {
    const bonusType = event.dataTransfer.getData("bonusType");
    if (!bonusType || (bonusType === "plus2" && bonuses.plus2) || (bonusType === "plus1" && bonuses.plus1)) {
      return; // Prevent duplicate bonuses on same stat
    }

    setBonuses((prev) => ({ ...prev, [bonusType]: ability })); // Assign bonus to the stat
    setAvailableBonuses((prev) => ({ ...prev, [bonusType]: false })); // Remove bonus from selection
  };

  const removeBonus = (ability) => {
    if (bonuses.plus2 === ability) {
      setBonuses((prev) => ({ ...prev, plus2: null }));
      setAvailableBonuses((prev) => ({ ...prev, plus2: true }));
    } else if (bonuses.plus1 === ability) {
      setBonuses((prev) => ({ ...prev, plus1: null }));
      setAvailableBonuses((prev) => ({ ...prev, plus1: true }));
    }
  };

  const getFinalScore = (ability) => {
    let baseScore = scores[ability];
    if (bonuses.plus2 === ability) return Math.min(baseScore + 2, 20);
    if (bonuses.plus1 === ability) return Math.min(baseScore + 1, 19);
    return baseScore;
  };

  return (
    <div className="creator-container">
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">
        Heroic Point Buy &nbsp; <span className="point-pool">Points Left: {pointPool}</span>
      </h3>

      {/* Ability Score Grid */}
      <div className="ability-grid">
        {Object.keys(scores).map((ability) => (
          <div 
            key={ability} 
            className="ability-box"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, ability)}
          >
            <h3 className="ability-title">{ability}</h3>
            <div 
              className={`score-display ${bonuses.plus2 === ability || bonuses.plus1 === ability ? "bonus-highlight" : ""}`}
              onClick={() => removeBonus(ability)}
            >
              {getFinalScore(ability)}
            </div>

            {/* Increase & Decrease Buttons */}
            <div className="button-group">
              <button 
                className="btn-stat" 
                onClick={() => increaseStat(ability)} 
                disabled={increaseCount[ability] >= 10}
              >
                +
              </button>
              <button className="btn-stat" onClick={() => decreaseStat(ability)}>-</button>
            </div>

            {/* Display Modifier */}
            <div className="modifier-display">
              {modCalc(getFinalScore(ability))}
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