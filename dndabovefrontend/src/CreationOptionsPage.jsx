import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RoutingTest from './RoutingTest'
import fetchEverything from './assets/CommonFunctions/fetchEverything'
import modCalc from './assets/CommonFunctions/modCalc'
import profCalc from './assets/CommonFunctions/profCalc'
import diceToInteger from './assets/CommonFunctions/diceToInteger'
import './assets/CreationOptionsPageStyles.css'
import * as bs from '../node_modules/bootstrap'

function CreationOptionsPage () 
{
    const [isChecked1, setIsChecked1] = useState(false);
    const checkHandler1 = () => {setIsChecked1(!isChecked1)}

    const [chosenStatCalc, setChosenStatCalc] = useState(0);

    const [dropdown, setDropdown] = useState(false);

    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })


    function Dropdown()
    {
        return (
            <div id="dropdown">
                <input type="button" value="Point Buy" onClick={() => statCalcChoice(1)}/><br/>
                <input type="button" value="Heroic Point Buy" onClick={() => statCalcChoice(2)}/><br/>
                <input type="button" value="Rolled" onClick={() => statCalcChoice(3)}/><br/>
                <input type="button" value="Custom" onClick={() => statCalcChoice(4)}/>
            </div>
        )
    }

    function statCalcChoice(choice)
    {
        setChosenStatCalc(choice)

    }



    return (
        <>
            <div className='container'>
                <div id='centerBlock'>
                    <h1>Character creation optional settings</h1>
                    <p>These are common houserules for character creation, if you are not sure which to use, consult your DM.</p>
                    <div id='backgroundFeat'>
                        <input type="checkbox" name="" id="" checked={isChecked1} onChange={checkHandler1}/>
                        Do you get a Feat at level 1 - akin to a background feature.
                    </div>
                    <div id='statCalculation'>
                        <input type="button" value="drop" onClick={()=>{setDropdown((prev)=>!prev);console.log("meg lett nyomva: ", dropdown)}}/>
                        {(dropdown) ? <Dropdown/> : <p></p>}
                        
                    </div>
                </div>
            </div>
        </>
    )
}


export default CreationOptionsPage;