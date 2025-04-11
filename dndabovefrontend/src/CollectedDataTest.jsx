import { useEffect, useState, useContext } from "react"
import { RaceIdContext, SubraceIdContext, SubraceFeatureContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext, BasicClassFeatureContext } from "./assets/SaveContexts/ClassContext.jsx"
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx"
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx"
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx"
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx"

import fetchEverything from "./assets/CommonFunctions/fetchEverything.js";


function CollectedDataTest()
{
    const { selectedRaceId } = useContext(RaceIdContext);
    const [ raceData, setRaceData ] = useState();
    const [ raceFeatures, setRaceFeatures ] = useState();
    const { selectedSubraceId } = useContext(SubraceIdContext);
    const { SubRaceFeature }  = useContext(SubraceFeatureContext);

    const { ClassId } = useContext(ClassIdContext);

    const { SubclassId } = useContext(SubclassIdContext);
    const { BasicClassFeature} = useContext(BasicClassFeatureContext);
    const { ChosenClassFeatureId } = useContext(ChosenClassFeatureIdContext);    

    const { Stats } = useContext(StatsContext)

    const { BgName } = useContext(BgNameContext);
    const { BgDesc } = useContext(BgDescContext);
    const { BgSkills } = useContext(BgSkillsContext);
    const { BgTool } = useContext(BgToolContext);

    const { Equipment } = useContext(EquipmentContext);
    const { RemainingGold } = useContext(RemainingGoldContext);

    const { FinalSpells } = useContext(FinalSpellsContext);

    const [save, setSave] = useState();

    useEffect(() => {
        console.log("All data like... ever")
        console.log("Race ID: " + selectedRaceId + "\nSubrace ID: " + selectedSubraceId + "\n\n") // Race
        console.log("Class ID: " + ClassId + "\nSubrace ID: " + SubclassId + "\nClass features: " + ChosenClassFeatureId + "\n\n") // Class
        console.log("Stats: " + Stats + "\n\n") // Stats
        console.log("Bg name: " + BgName + "\nBg Desc: " + BgDesc + "\nSkillls: " + BgSkills + "\nTool: " + BgTool + "\n\n") // Bg
        console.log("Equipment: " + Equipment + "\nGold: " + RemainingGold + "\n\n") // Equipment
        console.log("Spells: " + FinalSpells +"\n\n") // Spells
        var tempracedata
        var tempsubracedata
        var tempracefeatures
        async function fetchallthedataever()
        {
            tempracedata = await fetchEverything("Races/"+selectedRaceId)
            tempracefeatures = await fetchEverything("Features/Features/originraceid/"+selectedRaceId)
            console.log(tempracefeatures)
        }
        fetchallthedataever();
        setRaceFeatures(tempracefeatures);
        setRaceData(tempracedata);
        var tempsave;
        tempsave+="<><h1>Race<h1></>"
        raceFeatures.map((element,id)=>(
            tempsave+="<div className='selected-single'>"+element.name+"</div>"+"\n"+"<p>"+element.description+"</p>"
        ))
        console.log(tempsave)
        setSave(tempsave);
        
    },[selectedRaceId,selectedSubraceId,ClassId,SubclassId])

    return (
        <>
        {save}
        </>
    )
}
export default CollectedDataTest