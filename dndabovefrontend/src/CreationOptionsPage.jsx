import { useEffect, useState } from "react";
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { CreatorContext } from "./assets/BringStatChoice.jsx";



function CreationOptionsPage() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [chosenStatCalc, setChosenStatCalc] = useState(1);
  const [dropdown, setDropdown] = useState(false);

  const { setSelectedOption } = useContext(CreatorContext);

  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("Be van töltve az oldal, ye.");
  }, []);

  function statCalcChoice(choice) {
    setSelectedOption(choice);
    setDropdown(false); // Close dropdown after selection
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="creation-container p-4 rounded shadow-lg">
        <h1 className="text-center mb-3">Character Creation Options</h1>
        <p className="text-center">
          These are common house rules for character creation. If you are not sure which to use, consult your DM.
        </p>

        {/* Checkbox section - aligned correctly */}
        <div className="d-flex align-items-center mb-4">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="backgroundFeat"
            checked={isChecked1}
            onChange={() => setIsChecked1(!isChecked1)}
          />
          <label className="form-check-label" htmlFor="backgroundFeat">
            Do you get a Feat at level 1 - akin to a background feature?
          </label>
        </div>

        {/* Dropdown Button & List */}
        <div className="text-center position-relative">
          <button className="btn btn-primary btn-lg mb-2" onClick={() => setDropdown((prev) => !prev)}>
            Choose Stat Calculation Method
          </button>

          {dropdown && (
            <div id="dropdown">
              <button className="btn btn-outline-secondary" onClick={() => {statCalcChoice(1);navigate("/character-creator")}}>
                Point Buy
              </button>
              <button className="btn btn-outline-secondary" onClick={() => {statCalcChoice(2);navigate("/character-creator")}}>
                Heroic Point Buy
              </button>
              <button className="btn btn-outline-secondary" onClick={() => {statCalcChoice(3);navigate("/character-creator")}}>
                Custom or Rolled
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreationOptionsPage;