import { useEffect, useState } from 'react'
import RaceCard from './assets/CreatorPageCards/RaceCard'
import HeroicPointBuyStatCard from './assets/CreatorPageCards/StatCard/HeroicPointBuyStatCard'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomorRoledStatStatCard from './assets/CreatorPageCards/StatCard/CustomorRolledStatCard'
import PointBuyStatCard from './assets/CreatorPageCards/StatCard/PointBuyStatCard'

function CreatorPage ({option}) 
{



    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <>
        
        <div className='container'>
            <RaceCard/>

            {option == 1 ? <PointBuyStatCard/> : option == 2 ? <HeroicPointBuyStatCard/> : <CustomorRoledStatStatCard/>}
        </div>
        </>
    );
}

export default CreatorPage;