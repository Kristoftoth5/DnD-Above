import { useEffect, useState, useContext } from "react"
import { RaceIdContext, SubraceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext } from "./assets/SaveContexts/ClassContext.jsx"
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx"
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx"
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx"
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx"
import fetchEverything from "./assets/CommonFunctions/fetchEverything.js";


function CollectedDataTest()
{
    const { selectedRaceId } = useContext(RaceIdContext);
    const [ raceFeatures, setRaceFeatures ] = useState();
    const [ raceData, setRaceData ] = useState();
    const { selectedSubraceId } = useContext(SubraceIdContext);
    const [ subRaceFeatures, setSubRaceFeatures ] = useState();

    const { ClassId } = useContext(ClassIdContext);

    const { SubclassId } = useContext(SubclassIdContext);
    const [ subClassFeatures, setSubClassFeatures ] = useState();
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
            try 
            {
                // Fetch race data and race features
                const raceDataResponse = await fetchEverything("Races/" + selectedRaceId);
                const raceFeaturesResponse = await fetchEverything("Features/originraceid/" + selectedRaceId);
        
                // Update state with fetched data
                setRaceData(raceDataResponse);
                setRaceFeatures(raceFeaturesResponse);
        
                // Now create the HTML output string
                let tempSave = ``;
                raceFeaturesResponse.forEach((element, id) => {
                {element.name !== "Subrace" ? ( tempSave += `<h3>  ${element.name} </h3> \n <p> ${element.description} </p>`) : null}
                 
                });
                setSave(tempSave); // Set the HTML string
            }
            catch(error)
            {
                console.error("Error fetching data: ", error);
            }
        }
        fetchallthedataever();
        
    },[selectedRaceId, selectedSubraceId, ClassId, SubclassId])

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: save}}/>
        </>
    )
}
export default CollectedDataTest