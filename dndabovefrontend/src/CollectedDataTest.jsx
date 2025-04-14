import { useEffect, useState, useContext } from "react"
import { RaceIdContext, SubraceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext } from "./assets/SaveContexts/ClassContext.jsx"
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx"
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx"
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx"
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx"
import fetchEverything from "./assets/CommonFunctions/fetchEverything.js";
import modCalc from "./assets/CommonFunctions/modCalc.js";


function CollectedDataTest()
{
    const { selectedRaceId } = useContext(RaceIdContext);
    const [ raceFeatures, setRaceFeatures ] = useState();
    const [ raceData, setRaceData ] = useState();
    const { selectedSubraceId } = useContext(SubraceIdContext);
    const [ subRaceFeatures, setSubRaceFeatures ] = useState();

    const { ClassId } = useContext(ClassIdContext);
    const [classData, setClassData] = useState();
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
                const classDataResponse = await fetchEverything("Classes/"+ClassId)
                const subRaceFeaturesResponse = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/"+selectedSubraceId)
        
                // Update state with fetched data

        
                const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
                // Now create the HTML output string
                let tempSave = `
                    <div class="container-fluid mt-4">
                        <!-- Character Header Info -->
                        <div class="card mb-4 p-3 shadow-sm">
                            <div class="row g-3 align-items-center">
                                <!-- Character Name Input -->
                                <div class="col-md-4">
                                    <label for="characterName" class="form-label fw-bold">Character Name</label>
                                    <input type="text" id="characterName" class="form-control" placeholder="Enter name..." />
                                </div>

                                <!-- Class Display -->
                                <div class="col-md-2">
                                    <label class="form-label fw-bold">Class</label>
                                    <div id="characterClass">${classDataResponse.name}</div>
                                </div>

                                <!-- Level Display -->
                                <div class="col-md-2">
                                    <label class="form-label fw-bold">Level</label>
                                    <div id="characterLevel">[Level]</div>
                                </div>

                                <!-- Race Display -->
                                <div class="col-md-4">
                                    <label class="form-label fw-bold">Race</label>
                                    <div id="characterRace">${raceDataResponse.name}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Main Content Row -->
                        <div class="row">
                    `;
                tempSave += `<div class="container-fluid mt-4">
                                <div class="row">
                                    <!-- Left Column: Stats -->
                                    <div class="col-md-4 mb-4">
                                        <h4 class="mb-3 text-center">Ability Scores</h4>
                            `;

                if (Stats) {
                    Stats.forEach((stat, index) => {
                        const modifier = modCalc(stat);
                        tempSave += `
                            <div class="card shadow-sm mb-3 mx-auto" style="width: 130px;">
                                <div class="card-body text-center p-3">
                                    <h6 class="card-title mb-1" style="font-size: 1rem;">${statNames[index]}</h6>
                                    <p class="fw-bold mb-1" style="font-size: 1.5rem;">${stat}</p>
                                    <p class="text-muted mb-0" style="font-size: 0.9rem;">
                                        ${modifier >= 0 ? "+" : ""}${modifier}
                                    </p>
                                </div>
                            </div>`;
                    });
                }
                tempSave += `
                            </div>
                        </div>

                        <!-- Right Column: Race Features -->
                        <div class="col-md-8">
                `;

                tempSave+=`<h3>Race Features</h3>`
                raceFeaturesResponse.forEach((element) => {
                    if (element.name !== "Subrace") {
                        tempSave += `
                        <div class="mb-4">
                            <h5 class="fw-bold">${element.name}</h5>
                            <p>${element.description}</p>
                        </div>`;
                    }
                });
                tempSave+=`<h3>Subrace Features</h3>`
                subRaceFeaturesResponse.forEach((element) => {
                        tempSave += `
                        <div class="mb-4">
                            <h5 class="fw-bold">${element.name}</h5>
                            <p>${element.description}</p>
                        </div>`;
                });


                tempSave += `
                        </div> <!-- End Right Column -->
                    </div> <!-- End Row -->
                </div> <!-- End Container -->
                `;

                setSave(tempSave);

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