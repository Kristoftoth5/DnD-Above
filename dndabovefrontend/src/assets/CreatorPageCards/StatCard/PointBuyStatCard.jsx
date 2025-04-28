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

  const [bonuses, setBonuses] = useState({ plus2: null, plus1: null });
  const [availableBonuses, setAvailableBonuses] = useState({ plus2: true, plus1: true });

  const { setStats } = useContext(StatsContext)

  useEffect(() => {
    const updatedArray = Object.keys(scores).map((ability) => getFinalScore(ability));
    setStats(updatedArray);
  }, [scores, bonuses]);

  // Track how many times each stat has been increased
  const [increaseCount, setIncreaseCount] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  const increaseStat = (ability) => {
    let baseScore = scores[ability];
    const maxCap = bonuses.plus2 === ability ? 17 : bonuses.plus1 === ability ? 16 : 15;
    
    // Only allow increasing if not at the increase limit (7 times) and point pool is available
    if (increaseCount[ability] >= 7 || baseScore >= maxCap || pointPool <= 0) return;

    let cost = baseScore >= 13 ? 2 : 1;
    if (pointPool >= cost) {
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: baseScore + 1,
      }));
      setIncreaseCount((prevCount) => ({
        ...prevCount,
        [ability]: prevCount[ability] + 1,
      }));
      setPointPool(pointPool - cost);
    }
  };

  const decreaseStat = (ability) => {
    let baseScore = scores[ability];

    if (baseScore > 8) {
      let refund = baseScore > 13 ? 2 : 1;
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: baseScore - 1,
      }));
      setIncreaseCount((prevCount) => ({
        ...prevCount,
        [ability]: Math.max(prevCount[ability] - 1, 0), // Ensure increase count doesn't go below 0
      }));
      setPointPool(pointPool + refund);
    }
  };

  const handleDrop = (event, ability) => {
    const bonusType = event.dataTransfer.getData("bonusType");
    if (!bonusType) return;

    if (bonuses[bonusType] === ability) return; // Prevent re-assigning to the same stat

    // Check if the stat already has an increase
    const alreadyHasBonus = bonuses.plus2 === ability || bonuses.plus1 === ability;
    if (alreadyHasBonus) return; // Don't allow stacking bonuses in one stat

    // Assign the bonus
    setBonuses((prev) => ({ ...prev, [bonusType]: ability }));
    setAvailableBonuses((prev) => ({ ...prev, [bonusType]: false }));
  };

  const handleRemoveBonus = (ability) => {
    const updatedBonuses = { ...bonuses };

    let removedBonus = null;
    if (bonuses.plus2 === ability) {
      removedBonus = "plus2";
      updatedBonuses.plus2 = null;
    } else if (bonuses.plus1 === ability) {
      removedBonus = "plus1";
      updatedBonuses.plus1 = null;
    }

    if (removedBonus) {
      setBonuses(updatedBonuses);
      setAvailableBonuses((prev) => ({ ...prev, [removedBonus]: true }));
    }
  };

  const getFinalScore = (ability) => {
    let baseScore = scores[ability];
    if (bonuses.plus2 === ability) return Math.min(baseScore + 2, 17);
    if (bonuses.plus1 === ability) return Math.min(baseScore + 1, 16);
    return baseScore;
  };

  return (
    <div className="creator-container">
      <h2 className="creator-title">Ability Scores</h2>
      <h3 className="creator-sub-title">
        Point Buy &nbsp; <span className="point-pool">Points Left: {pointPool}</span>
      </h3>

      {/* Ability Score Grid */}
      <div className="ability-grid">
        {Object.keys(scores).map((ability) => {
          const hasBonus = bonuses.plus2 === ability || bonuses.plus1 === ability;
          return (
            <div 
              key={ability} 
              className="ability-box"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, ability)}
            >
              <h3 className="ability-title">{ability}</h3>
              <div 
                className={`score-display ${hasBonus ? "bonus-highlight" : ""}`}
                onClick={() => hasBonus && handleRemoveBonus(ability)} // Click to remove bonus
              >
                {getFinalScore(ability)}
              </div>

              {/* Increase & Decrease Buttons */}
              <div className="button-group">
                <button 
                  className="btn-stat" 
                  onClick={() => increaseStat(ability)} 
                  disabled={increaseCount[ability] >= 7}
                >
                  +
                </button>
                <button 
                  className="btn-stat" 
                  onClick={() => decreaseStat(ability)}
                >
                  -
                </button>
              </div>

              {/* Display Modifier */}
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
  );
}

export default AbilityScores;