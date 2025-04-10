import { useEffect, useState } from "react";
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { CreatorContext, ExtraFeatContext } from "./assets/BringStatChoice.jsx";
import background1 from './assets/bgImages/one.jpg'
import background2 from './assets/bgImages/two.jpg'
import background3 from './assets/bgImages/three.jpg'
import background4 from './assets/bgImages/four.jpg'
import background5 from './assets/bgImages/five.jpg'
import background6 from './assets/bgImages/six.jpg'
import background7 from './assets/bgImages/seven.jpg'
import background8 from './assets/bgImages/eight.jpg'



function CreationOptionsPage() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [chosenStatCalc, setChosenStatCalc] = useState(1);
  const [dropdown, setDropdown] = useState(false);

  const { setSelectedOption } = useContext(CreatorContext);
  const { setExtraFeat } = useContext(ExtraFeatContext)

  const navigate = useNavigate();

  var firstbg = Math.floor(Math.random() * 8)
  const [images, setImages] = useState([background1, background2, background3, background4, background5, background6, background7, background8])
  const [randomBgImage, setRandomBgImage] = useState(firstbg);
  

  useEffect(() => {
    console.log("Be van töltve az oldal, ye.");
  }, []);

  useEffect(()=>{
              const interval = setInterval(() => {
                  setRandomBgImage(Math.floor(Math.random() * 8));
              }, 600000);
              return () => clearInterval(interval);
          }, [randomBgImage])
      
      const myStyle = {
          backgroundImage: `url(${images[randomBgImage]})`,
          backgroundAttachment: "fixed", // Keeps the background fixed while scrolling
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundSize: "cover", // Makes the image cover the entire background
          backgroundPosition: "center center" // Centers the image properly
      };

  function statCalcChoice(choice) {
    setSelectedOption(choice);
    setDropdown(false); // Close dropdown after selection
  }

  return (
    <div style={myStyle}>
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
            onChange={() => {setIsChecked1(!isChecked1);setExtraFeat(isChecked1);}}
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
    </div>
  );
}

export default CreationOptionsPage;