import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDiceRoller, setShowDiceRoller] = useState(false);

  const handleNavigation = (path) => {
    if (location.pathname === "/character-creator") {
      const confirmLeave = window.confirm("Are you sure you want to return? Everything unsaved will be lost.");
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="nav-link btn btn-link" onClick={() => handleNavigation("/")}>
            Home
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/creator-options")}>
                Create New Character
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/character-creator")}>
                Saved Characters
              </button>
            </li>
            <li className="nav-item">
            <button
              className="btn btn-warning"
              onClick={() => setShowDiceRoller((prev) => !prev)}
            >
              Dice Roller
            </button>

            {/* Dice Roller Component (conditionally rendered) */}
            <DiceRoller isVisible={showDiceRoller} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;