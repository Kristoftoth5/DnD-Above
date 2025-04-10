import { useEffect, useState, useContext } from "react"
import { RaceIdContext, SubraceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext } from "./assets/SaveContexts/ClassContext.jsx"
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx"
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx"
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx"
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx"


function CollectedDataTest()
{
    const { selectedRaceId } = useContext(RaceIdContext);
    const { selectedSubraceId } = useContext(SubraceIdContext);

    const { ClassId } = useContext(ClassIdContext);
    const { SubclassId } = useContext(SubclassIdContext);
    const { ChosenClassFeatureId } = useContext(ChosenClassFeatureIdContext);    

    const { Stats } = useContext(StatsContext)

    const { BgName } = useContext(BgNameContext);
    const { BgDesc } = useContext(BgDescContext);
    const { BgSkills } = useContext(BgSkillsContext);
    const { BgTool } = useContext(BgToolContext);

    const { Equipment } = useContext(EquipmentContext);
    const { RemainingGold } = useContext(RemainingGoldContext);

    const { FinalSpells } = useContext(FinalSpellsContext);

    useEffect(() => {
        console.log("All data like... ever")
        console.log("Race ID: " + selectedRaceId + "\nSubrace ID" + selectedSubraceId + "\n\n") // Race
        console.log() // Class
        console.log() // Stats
        console.log() // Bg
        console.log() // Equipment
        console.log() // Spells
    })

    return (
        <>
        
        </>
    )
}
export default CollectedDataTest