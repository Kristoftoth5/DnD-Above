import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/Styles.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-md-6">
          <div 
            className="option-card"
            onClick={() => navigate("/creator-options")}
          >
            Create New Character
          </div>
        </div>
        <div className="col-md-6">
          <div 
            className="option-card"
            onClick={() => navigate("/character-creator")}
          >
            Saved Characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;