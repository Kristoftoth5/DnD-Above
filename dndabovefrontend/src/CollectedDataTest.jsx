import { useEffect, useState, useContext } from "react"
import { RaceIdContext, SubraceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext, FinalCharacterLevelContext } from "./assets/SaveContexts/ClassContext.jsx"
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx"
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx"
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx"
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx"
import fetchEverything from "./assets/CommonFunctions/fetchEverything.js";
import modCalc from "./assets/CommonFunctions/modCalc.js";
import profCalc from "./assets/CommonFunctions/profCalc.js"
import diceToInteger from "./assets/CommonFunctions/diceToInteger.js"


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
    
    const [profBonus, setProfBonus] = useState();
    const [currentHP, setCurrentHP] = useState(0);


    const { Stats } = useContext(StatsContext)

    const { BgName } = useContext(BgNameContext);
    const { BgDesc } = useContext(BgDescContext);
    const { BgSkills } = useContext(BgSkillsContext);
    const { BgTool } = useContext(BgToolContext);

    const { Equipment } = useContext(EquipmentContext);
    const { RemainingGold } = useContext(RemainingGoldContext);

    const { FinalSpells } = useContext(FinalSpellsContext);

    const { FinalCharacterLevel } = useContext(FinalCharacterLevelContext)

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
        setProfBonus(profCalc(FinalCharacterLevel));
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
                const skills = [["Acrobatics","2"],["Animal Handling","5"],["Arcana","4"],["Athletics","1"],["Deception","6"],["History","4"],["Insight","5"],["Intimidiation","6"],["Investigation","4"],["Medicine","5"],["Nature","4"],["Perception","5"],["Performance","6"],["Persuasion","6"],["Religion","4"],["Sleight of Hand","2"],["Stealth","2"],["Survival","5"]];

                var skillProfs = [];
                const conMod = modCalc(Stats[2]);
                const hitDice = diceToInteger(classDataResponse.hitDice);
                const maxHpCalc = (FinalCharacterLevel * conMod) + (FinalCharacterLevel * (hitDice / 2));
                setCurrentHP(maxHpCalc); 



                raceFeaturesResponse.forEach((element, id)=>{
                    if(element.skillProf.length !== 0)
                        {
                            element.skillProf.forEach(skill => {
                                skillProfs.push(skill);
                            });
                        }
                });

                subRaceFeaturesResponse.forEach((element, id)=>{
                    if(element.skillProf.length !== 0)
                        {
                            element.skillProf.forEach(skill => {
                                skillProfs.push(skill);
                            });
                        }
                });

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
                                    <div id="characterLevel">${FinalCharacterLevel}</div>
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

                        <!-- Right Column: Rest of front page -->
                        <!-- Skills -->
                        <div class="col-md-4 mb-4">
                                        <h4 class="mb-3 text-center">Skills</h4>`;


                {/*Background skills checking.*/}
                if (BgSkills)
                {
                    skills.forEach((element, index)=>{
                        var stat = Stats[element[1]-1]
                        console.log("stat: ",stat)
                        var mod = modCalc(stat);
                        console.log("mod: ",mod)
                        var pbmod = mod+profBonus;
                        console.log("pbmod: ",pbmod)
                        if(element[0] == BgSkills[0] || element[0] == BgSkills[1])
                        {
                            tempSave+=`<p><b>${element[0]}(<i>P</i>)</b>: ${pbmod>=0 ? "+" : ""}${pbmod} </p>`
                        }
                        else if(skillProfs.find(item => item == element[0]))
                        {
                            tempSave+=`<p><b>${element[0]}(<i>P</i>)</b>: ${pbmod>=0 ? "+" : ""}${pbmod} </p>`
                        }
                        else
                        {
                            tempSave+=`<p><b>${element[0]}</b>: ${mod>=0 ? "+" : ""}${mod}</p>`
                        }

                    });
                }
                
                tempSave+=`<div class="col-md-8">`
                tempSave += `
                <div class="card shadow-sm mb-4 p-3">
                    <h4 class="fw-bold mb-3">Combat Stats</h4>
                    <div class="row g-3">
                        <!-- Max HP -->
                    <div class="col-md-4">
                        <label class="form-label fw-bold">Max HP</label>
                        <input type="number" class="form-control" id="maxHP" value="${maxHpCalc}" readonly />
                    </div>

                    <!-- Current HP -->
                    <div class="col-md-4">
                        <label class="form-label fw-bold">Current HP</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            id="currentHP" 
                            value="${currentHP}" 
                            min="0" 
                            max="${maxHpCalc}" 
                            oninput="if(this.value > ${maxHpCalc}) this.value = ${maxHpCalc}" 
                        />
                    </div>


                        <!-- Armor Class -->
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Armor Class</label>
                            <div id="armorClass" class="form-control bg-light">15</div>
                        </div>

                        <!-- Speed -->
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Speed</label>
                            <div id="movementSpeed" class="form-control bg-light">30 ft</div>
                        </div>
                    </div>

                    <!-- Saving Throws -->
                    <div class="mt-4">
                        <h5 class="fw-bold">Saving Throws</h5>
                        <ul id="savingThrows" class="list-group list-group-flush">
                            <li class="list-group-item">Strength: +2</li>
                            <li class="list-group-item">Dexterity: +1</li>
                            <li class="list-group-item">Constitution: +3</li>
                            <li class="list-group-item">Intelligence: +0</li>
                            <li class="list-group-item">Wisdom: +1</li>
                            <li class="list-group-item">Charisma: +2</li>
                        </ul>
                    </div>

                    <!-- Resistances -->
                    <div class="mt-4">
                        <h5 class="fw-bold">Resistances</h5>
                        <div id="resistances">Fire, Cold</div>
                    </div>
                </div>
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