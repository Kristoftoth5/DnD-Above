import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import { useState, useContext } from "react";
import falmingo from './falmingo.png';
import { UserIdContext } from "./UserContext";
import { ClassIdContext } from "./SaveContexts/ClassContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const [showDiceRoller, setShowDiceRoller] = useState(false);

  const { UserId, setUserId } = useContext(UserIdContext);
  const { setClassId } = useContext(ClassIdContext)

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");


  const handleNavigation = (path) => {
    if (location.pathname === "/character-creator") {
      const confirmLeave = window.confirm("Are you sure you want to return? Everything unsaved will be lost.");
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        null;
    }
    else
    {
      const payload = token.split('.')[1];
    
      const decodedPayload = JSON.parse(atob(payload));

      const currentTime = Math.floor(Date.now() / 1000); 
      const expirationTime = decodedPayload.exp;

      setIsTokenExpired( expirationTime > currentTime);
    }

    
  },[token,UserId])

  useEffect(() => {
    const logOutOnExpiredAccessToken = async () => {
      
  
      if (!refreshToken && token) {
          console.error('No refresh token available');
          localStorage.removeItem('authToken');setToken("");
          localStorage.removeItem('UserId');setUserId(0);
          localStorage.removeItem('refreshToken');
          navigate("/");
          return;
      }
  
      
    };

    logOutOnExpiredAccessToken();
  }, [isTokenExpired]);

  const sendLogOut = async () => {
    const url = "https://localhost:5001/api/Auth/logout";  
    const data = {
      token: refreshToken
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      
      
    } catch (error) {
      console.log("Logout error:", error);
    }
  };



  const handleLogOut = async () => {
   
      const confirmLogOut = window.confirm("Are you sure you want to log out? You will not have access to the Saves menu or character creation until you sign in again.");
      if (!confirmLogOut) return;
      else
      {
        const a = await sendLogOut();
        localStorage.removeItem('authToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUserId(0);
    
        navigate("/");
      }
      
  };

  useEffect(()=>{
    setToken(localStorage.getItem('authToken'))
  },[token,UserId])

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand navbar-light bg-light">

        <button className="nav-link btn btn-link" onClick={() => handleNavigation("/")}>
            <img src={falmingo} alt="Save" className="icon flipped" />
            Home
        </button>
        <div className="navbar-text">
          <ul className="navbar-nav ms-auto">
            {token?(<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => {handleNavigation("/creator-options");setClassId(0);}}>
                Create New Character
              </button>
            </li>):null}
            
            {token?(<li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleNavigation("/saves-list")}>
                Saved Characters
              </button>
            </li>):null}
            
            {token ?(<li className="nav-item">
              <button className="nav-link btn btn-warning" onClick={() => {handleLogOut();}}>
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