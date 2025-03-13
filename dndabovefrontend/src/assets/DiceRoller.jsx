import React, { useEffect, useState } from "react";
import "./RollerStyles.css"; // Import CSS for styling

function DiceRoller({ isVisible }) {


  const [rolledValue, setRolledValue] = useState(0);
  const [rolls, setRolls] = useState("| ");

  useEffect(()=>{
    console.log("Be van töltve az oldal, ye.")
  }, [rolledValue])

  function Roll()
  {
    var counter = 0;
    var rollses = "| ";

    var Amount = document.getElementById("AmountInput").value;
    var Size = document.getElementById("SizeInput").value;

    for (var i = 0; i < Amount;i++)
    {
      var temp = (Math.floor(Math.random() * Size) + 1)
      counter += temp;
      rollses += temp.toString() + " | "
      console.log(counter)
    }

    setRolledValue(counter);
    setRolls(rollses);
  }

  return (
    <div className={`dice-roller ${isVisible ? "show" : "hide"}`}>
      <h3>{rolledValue}</h3>
      <p>{rolls}</p>

      {/* Number Inputs */}
      <div className="dice-inputs">
        <label>
          Dice Amount:
          <input type="number" min="1" defaultValue="1" id="AmountInput"/>
        </label>
        <label>
          Dice Size:
          <input type="number" min="2" step="2" defaultValue="6" id="SizeInput"/>
        </label>
      </div>

      {/* Hexagon Roll Button */}
      <div className="hexagon-btn-container">
        <button className="hexagon-btn" onClick={() => {Roll()}}>Roll</button>
      </div>
    </div>
  );
}

export default DiceRoller;