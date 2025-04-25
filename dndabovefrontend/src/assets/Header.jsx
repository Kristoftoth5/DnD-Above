import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import falmingo from './falmingo.png';
import { UserIdContext } from "./UserContext";
import { ClassIdContext } from "./SaveContexts/ClassContext";
import { decode } from 'jwt-decode';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const [showDiceRoller, setShowDiceRoller] = useState(false);

  const { UserId, setUserId } = useContext(UserIdContext);
  const { setClassId } = useContext(ClassIdContext)

  const handleNavigation = (path) => {
    if (location.pathname === "/character-creator") {
      const confirmLeave = window.confirm("Are you sure you want to return? Everything unsaved will be lost.");
      if (!confirmLeave) return;
    }
    navigate(path);
  };
  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime;
    } catch (e) {
      return false; // Token might be invalid
    }
    };
  useEffect(()=>{
    
  },[isTokenExpired])

  const handleLogOut = async () => {
   
      const confirmLogOut = window.confirm("Are you sure you want to log out? You will not have access to the Saves menu or character creation until you sign in again.");
      if (!confirmLogOut) return;
      else
      {
        localStorage.removeItem('authToken');setUserId(0);
        localStorage.removeItem('UserId');
        var url = "https://localhost:7188/api/Auth/logout"
        data = 
        {
          "token":token
        }
        try
        {
          const response = await fetch(url, 
            {
              method: "GET",
              headers: 
              {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
              },
              body:JSON.stringify(data),
            });
        
        
            const responseData = await response.json();
            console.log("Response Data:", responseData);
        }
        catch(error)
        {
          console.log("Error: ",error)
        }
        navigate("/");
      }
  };

  useEffect(()=>{
    setToken(localStorage.getItem('authToken'))
  },[token,UserId])

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <button className="nav-link btn btn-link" onClick={() => handleNavigation("/")}>
            <img src={falmingo} alt="Save" className="icon flipped" />
            Home
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {token?(<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => {handleNavigation("/creator-options");setClassId(0);window.location.reload();}}>
                Create New Character
              </button>
            </li>):null}
            
            {token?(<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/saves-list")}>
                Saved Characters
              </button>
            </li>):null}
            
            {token ?(<li className="nav-item">
              <button className="nav-link btn btn-warning" onClick={() => {handleLogOut();window.location.reload();}}>
                Logout
              </button>
            </li>):null}

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
            {console.log(UserId)}
            
          </ul>
        </div>

      </nav>
    </div>
  );
};

export default Header;