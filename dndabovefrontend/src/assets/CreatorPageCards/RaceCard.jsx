import { useEffect, useState } from 'react'

function RaceCard() 
{
    const [race, setRace] = useState


    useEffect(()=>{
        console.log("Be van töltve az oldal, ye.")
    })

    return (
        <>
            <p>RaceCard</p>
        </>
    )
}

export default RaceCard;