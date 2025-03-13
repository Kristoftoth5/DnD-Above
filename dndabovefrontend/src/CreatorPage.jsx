import { useEffect, useState } from 'react'
import RaceCard from './assets/CreatorPageCards/RaceCard'
import "bootstrap/dist/css/bootstrap.min.css";

function CreatorPage () 
{
    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <>
        
        <div className='container'>
            <RaceCard/>
        </div>
        </>
    );
}

export default CreatorPage;