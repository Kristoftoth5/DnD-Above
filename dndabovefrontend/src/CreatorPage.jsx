import { use, useEffect, useState } from 'react'
import React, { useContext } from "react";
import { CreatorContext } from "./assets/BringStatChoice.jsx";
import { ClassIdContext } from "./assets/SaveContexts/ClassContext.jsx";
import { RaceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { useNavigate } from 'react-router-dom';
import RaceCard from './assets/CreatorPageCards/RaceCard'
import BackgroundCard from './assets/CreatorPageCards/BackgroundCard'
import ClassCard from './assets/CreatorPageCards/ClassCard.jsx'
import HeroicPointBuyStatCard from './assets/CreatorPageCards/StatCard/HeroicPointBuyStatCard'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomorRoledStatStatCard from './assets/CreatorPageCards/StatCard/CustomorRolledStatCard'
import PointBuyStatCard from './assets/CreatorPageCards/StatCard/PointBuyStatCard'
import background1 from './assets/bgImages/one.jpg'
import background2 from './assets/bgImages/two.jpg'
import background3 from './assets/bgImages/three.jpg'
import background4 from './assets/bgImages/four.jpg'
import background5 from './assets/bgImages/five.jpg'
import background6 from './assets/bgImages/six.jpg'
import background7 from './assets/bgImages/seven.jpg'
import background8 from './assets/bgImages/eight.jpg'
import EquipmentCard from './assets/CreatorPageCards/EquipmentCard.jsx';
import SpellCard from './assets/CreatorPageCards/SpellCard.jsx';
import falmingo from './assets/falmingo.png';

function CreatorPage () 
{
    const { ClassId } = useContext(ClassIdContext);


    const { selectedOption } = useContext(CreatorContext);
    const { selectedRaceId } = useContext(RaceIdContext);
    
    const navigate = useNavigate();

    var firstbg = Math.floor(Math.random() * 8)
    const [images] = useState([background1, background2, background3, background4, background5, background6, background7, background8])
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
        <>
        <div style={myStyle}>
        <div className="container">

            {selectedOption == 1 ? <PointBuyStatCard/> : selectedOption == 2 ? <HeroicPointBuyStatCard/> : <CustomorRoledStatStatCard/>}
            <RaceCard/> 
            <BackgroundCard/>
            <ClassCard/>
            <EquipmentCard classId = {ClassId}/>
            <SpellCard ClassId={ClassId}/>
            <div className='save'>
            <button 
                className="save-button" 
                onClick={() => {ClassId == 0 || selectedRaceId == 0 ? window.alert("You need to select a Race and a Class") : navigate("/finalize")}}
                >
                <img src={falmingo} alt="Save" className="icon flipped" />
                Save Character
                <img src={falmingo} alt="Save" className="icon" />
            </button>
            </div>
        </div>
        </div>
        </>
    );
}

export default CreatorPage;