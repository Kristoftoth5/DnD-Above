import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RoutingTest from './RoutingTest'
import fetchEverything from './assets/CommonFunctions/fetchEverything'
import modCalc from './assets/CommonFunctions/modCalc'
import profCalc from './assets/CommonFunctions/profCalc'
import diceToInteger from './assets/CommonFunctions/diceToInteger'
import RaceCard from './assets/CreatorPageCards/RaceCard'
import * as bs from '../node_modules/bootstrap'

function CreatorPage () 
{
    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <div className='container'>

        </div>
    );
}

export default CreatorPage;