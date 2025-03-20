import { useEffect, useState } from 'react'
import RaceCard from './assets/CreatorPageCards/RaceCard'
import "bootstrap/dist/css/bootstrap.min.css";
import BackgroundCard from './assets/CreatorPageCards/BackgroundCard';

function CreatorPage () 
{
    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <>
        
        <div className='container'>
            <RaceCard/>

            <BackgroundCard/>
        </div>
        </>
    );
}

export default CreatorPage;