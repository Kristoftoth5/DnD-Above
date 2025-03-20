import { useEffect, useState } from 'react'
import React, { useContext } from "react";
import { CreatorContext } from "./assets/BringStatChoice.jsx";
import RaceCard from './assets/CreatorPageCards/RaceCard'
import BackgroundCard from './assets/CreatorPageCards/BackgroundCard'
import HeroicPointBuyStatCard from './assets/CreatorPageCards/StatCard/HeroicPointBuyStatCard'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomorRoledStatStatCard from './assets/CreatorPageCards/StatCard/CustomorRolledStatCard'
import PointBuyStatCard from './assets/CreatorPageCards/StatCard/PointBuyStatCard'

function CreatorPage ({option}) 
{

    const { selectedOption } = useContext(CreatorContext);


    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <>
        
        <div className='creator-container'>
            <RaceCard/> 
            <BackgroundCard/>
            {selectedOption == 1 ? <PointBuyStatCard/> : selectedOption == 2 ? <HeroicPointBuyStatCard/> : <CustomorRoledStatStatCard/>}
        </div>
        </>
    );
}

export default CreatorPage;