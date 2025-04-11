import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/Styles.css';
import background1 from './assets/bgImages/one.jpg'
import background2 from './assets/bgImages/two.jpg'
import background3 from './assets/bgImages/three.jpg'
import background4 from './assets/bgImages/four.jpg'
import background5 from './assets/bgImages/five.jpg'
import background6 from './assets/bgImages/six.jpg'
import background7 from './assets/bgImages/seven.jpg'
import background8 from './assets/bgImages/eight.jpg'

const Home = () => {
  const navigate = useNavigate();

  var firstbg = Math.floor(Math.random() * 8)
  const [images, setImages] = useState([background1, background2, background3, background4, background5, background6, background7, background8])
  const [randomBgImage, setRandomBgImage] = useState(firstbg);

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

  return (
    <div style={myStyle}>
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
    </div>
  );
};

export default Home;