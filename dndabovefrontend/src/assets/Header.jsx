import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import falmingo from './falmingo.png';
import { UserIdContext } from "./UserContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const [showDiceRoller, setShowDiceRoller] = useState(false);

  const {UserId,setUserId} = useContext(UserIdContext)

  const handleNavigation = (path) => {
    if (location.pathname === "/character-creator") {
      const confirmLeave = window.confirm("Are you sure you want to return? Everything unsaved will be lost.");
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  const handeLogOut = () => {
   
      const confirmLogOut = window.confirm("Are you sure you want to log out? You will not have access to the Saves menu until you sign in again.");
      if (!confirmLogOut) return;
      else
      {
        localStorage.removeItem('authToken');setUserId(0);
      }
  };

  useEffect(()=>{
    setToken(localStorage.getItem('authToken'))
  },[token,UserId])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="nav-link btn btn-link" onClick={() => handleNavigation("/")}>
            <img src={falmingo} alt="Save" className="icon flipped" />
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

            {!token ? (<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/sign-up")}>
                Sign Up
              </button>
            </li>):null}
            
            {!token ? (<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/sign-in")}>
                Sign In
              </button>
            </li>):null}
            
            {token ?(<li className="nav-item">
              <button className="nav-link btn btn-warning" onClick={() => { handeLogOut();}}>
                Logout
              </button>
            </li>):null}
            {console.log(UserId)}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;