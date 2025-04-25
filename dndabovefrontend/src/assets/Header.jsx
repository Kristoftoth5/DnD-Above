import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const refreshToken = localStorage.getItem('refreshToken');


  const handleNavigation = (path) => {
    if (location.pathname === "/character-creator") {
      const confirmLeave = window.confirm("Are you sure you want to return? Everything unsaved will be lost.");
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        return false; 
    }

    const payload = token.split('.')[1];
    
    const decodedPayload = JSON.parse(atob(payload));

    const currentTime = Math.floor(Date.now() / 1000); 
    const expirationTime = decodedPayload.exp;

    setIsTokenExpired( expirationTime > currentTime);
  };

  useEffect(() => {
    const logOutOnExpiredAccessToken = async () => {
      
  
      if (!refreshToken && token) {
          console.error('No refresh token available');
          localStorage.removeItem('authToken');setToken("");
          localStorage.removeItem('UserId');setUserId(0);
          localStorage.removeItem('refreshToken');
          navigate("/");
          window.location.reload();
          return;
      }
  
      
    };

    logOutOnExpiredAccessToken();
  }, [isTokenExpired]);



  const handleLogOut = async () => {
   
      const confirmLogOut = window.confirm("Are you sure you want to log out? You will not have access to the Saves menu or character creation until you sign in again.");
      if (!confirmLogOut) return;
      else
      {
        localStorage.removeItem('authToken');setUserId(0);
        localStorage.removeItem('UserId');
        localStorage.removeItem('refreshToken');
        navigate("/");
        window.location.reload();
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