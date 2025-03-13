import React from "react";
import "./RollerStyles.css"; // Import CSS for styling

function DiceRoller({ isVisible }) {
  return (
    <div className={`dice-roller ${isVisible ? "show" : "hide"}`}>
      <h3 className="text-white text-center">Dice Roller</h3>
      {/* You can add dice rolling functionality here later */}
    </div>
  );
}

export default DiceRoller;