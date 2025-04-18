import { useEffect, useState, useContext } from "react";
import { RaceIdContext, SubraceIdContext } from "./assets/SaveContexts/RaceContext.jsx";
import { ClassIdContext, SubclassIdContext, ChosenClassFeatureIdContext, FinalCharacterLevelContext } from "./assets/SaveContexts/ClassContext.jsx";
import { StatsContext } from "./assets/SaveContexts/StatContext.jsx";
import { BgNameContext, BgDescContext, BgSkillsContext, BgToolContext } from "./assets/SaveContexts/BackgroundContext.jsx";
import { EquipmentContext, RemainingGoldContext } from "./assets/SaveContexts/EquipmentContext.jsx";
import { FinalSpellsContext } from "./assets/SaveContexts/FinalSpellContext.jsx";
import fetchEverything from "./assets/CommonFunctions/fetchEverything.js";
import modCalc from "./assets/CommonFunctions/modCalc.js";
import profCalc from "./assets/CommonFunctions/profCalc.js";
import diceToInteger from "./assets/CommonFunctions/diceToInteger.js";

function CollectedDataTest() {
    const { selectedRaceId } = useContext(RaceIdContext);
    const { selectedSubraceId } = useContext(SubraceIdContext);
    const { ClassId } = useContext(ClassIdContext);
    const { SubclassId } = useContext(SubclassIdContext);
    const { ChosenClassFeatureId } = useContext(ChosenClassFeatureIdContext);
    const { Stats } = useContext(StatsContext);
    const { BgName } = useContext(BgNameContext);
    const { BgDesc } = useContext(BgDescContext);
    const { BgSkills } = useContext(BgSkillsContext);
    const { BgTool } = useContext(BgToolContext);
    const { Equipment } = useContext(EquipmentContext);
    const { RemainingGold } = useContext(RemainingGoldContext);
    const { FinalSpells } = useContext(FinalSpellsContext);
    const { FinalCharacterLevel } = useContext(FinalCharacterLevelContext);

    const [save, setSave] = useState();
    const [currentHP, setCurrentHP] = useState(0);
    const [raceFeatures, setRaceFeatures] = useState([]);
    const [subraceFeatures, setSubraceFeatures] = useState([]);

    useEffect(() => {
        console.log("Fetching all data...");
        var tempraceData, tempsubraceData, tempraceFeatures;
        console.log("All data like... ever")
        console.log("Race ID: " + selectedRaceId + "\nSubrace ID: " + selectedSubraceId + "\n\n") // Race
        console.log("Class ID: " + ClassId + "\nSubrace ID: " + SubclassId + "\nClass features: " + ChosenClassFeatureId + "\n\n") // Class
        console.log("Stats: " + Stats + "\n\n") // Stats
        console.log("Bg name: " + BgName + "\nBg Desc: " + BgDesc + "\nSkillls: " + BgSkills + "\nTool: " + BgTool + "\n\n") // Bg
        console.log("Equipment: " + Equipment + "\nGold: " + RemainingGold + "\n\n") // Equipment
        console.log("Spells: " + FinalSpells +"\n\n") // Spells
        async function fetchAllData() {
            try {
                // Fetch race data and race features
                const raceDataResponse = await fetchEverything("Races/" + selectedRaceId);
                const raceFeaturesResponse = await fetchEverything("Features/originraceid/" + selectedRaceId);
                const classDataResponse = await fetchEverything("Classes/" + ClassId);
                const subRaceFeaturesResponse = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/" + selectedSubraceId);
                
                // Store race and subrace features
                setRaceFeatures(raceFeaturesResponse);
                setSubraceFeatures(subRaceFeaturesResponse);

                // Calculate stats
                const profBonus = profCalc(FinalCharacterLevel);
                const conMod = modCalc(Stats[2]);
                const hitDice = diceToInteger(classDataResponse.hitDice);
                const maxHpCalc = (FinalCharacterLevel * conMod) + (FinalCharacterLevel * (hitDice / 2));
                setCurrentHP(maxHpCalc); // Set Current HP

                // Collect skill proficiencies
                let skillProfs = [];
                raceFeaturesResponse.forEach((element) => {
                    if (element.skillProf.length !== 0) {
                        element.skillProf.forEach(skill => {
                            skillProfs.push(skill);
                        });
                    }
                });

                subRaceFeaturesResponse.forEach((element) => {
                    if (element.skillProf.length !== 0) {
                        element.skillProf.forEach(skill => {
                            skillProfs.push(skill);
                        });
                    }
                });

                BgSkills.forEach((element)=>{
                    if(!skillProfs.find(item=>item === element))
                    {
                        skillProfs.push(element);
                    }
                })

                // Equipment Section
                const strength = Stats[0]; // Strength stat
                const equipmentFields = [];
                const equipmentCount = strength * 3; // Calculate the number of fields based on Strength stat
                for (let i = 0; i < equipmentCount; i++) {
                    const itemName = Equipment[i] || ""; // If no equipment exists, leave blank
                    equipmentFields.push({
                        itemName,
                        itemQuantity: 1
                    });
                }


                // Start building the tempSave HTML content
                let tempSave = `
                    <div class="container-fluid mt-4">
                        <div class="row">
                            <!-- Left Column: Stats, Skills, Saving Throws -->
                            <div class="col-md-6">
                                <!-- Character Header Info -->
                                <div class="card mb-4 p-3 shadow-sm">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-md-4">
                                            <label for="characterName" class="form-label fw-bold">Character Name</label>
                                            <input type="text" id="characterName" class="form-control" placeholder="Enter name..." />
                                        </div>

                                        <div class="col-md-2">
                                            <label class="form-label fw-bold">Class</label>
                                            <div id="characterClass">${classDataResponse.name}</div>
                                        </div>

                                        <div class="col-md-2">
                                            <label class="form-label fw-bold">Level</label>
                                            <div id="characterLevel">${FinalCharacterLevel}</div>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="form-label fw-bold">Race</label>
                                            <div id="characterRace">${raceDataResponse.name}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ability Scores -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3 text-center">Ability Scores</h4>
                                    ${Stats.map((stat, index) => {
                                        const modifier = modCalc(stat);
                                        return `
                                            <div class="card shadow-sm mb-3 mx-auto" style="width: 130px;">
                                                <div class="card-body text-center p-3">
                                                    <h6 class="card-title mb-1">${["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"][index]}</h6>
                                                    <p class="fw-bold mb-1">${stat}</p>
                                                    <p class="text-muted mb-0">${modifier >= 0 ? "+" : ""}${modifier}</p>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>



                                <!-- Skills -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3 text-center">Skills</h4>
                                    ${[["Acrobatics",2],["Animal Handling",5],["Arcana",4],["Athletics",1],["Deception",6],["History",4],["Insight",5],["Intimidiation",6],["Investigation",4],["Medicine",5],["Nature",4],["Perception",5],["Performance",6],["Persuasion",6],["Religion",4],["Sleight of Hand",2],["Stealth",2],["Survival",5]]
                                        .map((skill, index) => {
                                            const stat = Stats[skill[1]-1];
                                            const mod = modCalc(stat);
                                            const pbMod = mod + profBonus;
                                            return `
                                                <p><b>${skill[0]}</b> (${["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"][skill[1]-1]}): ${skillProfs.includes(skill[0]) ? (`(<i>P</i>) ${pbMod > 0 ? "+" : ""}${pbMod}`) :  mod > 0 ? `+${mod}` : `${mod}`}</p>
                                            `;
                                        }).join('')}
                                </div>

                                <!-- Background Tool Proficiency -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Tool Proficiency</h4>
                                    <input type="text" class="form-control" value="${BgTool}" placeholder="Enter tool proficiency..." />
                                </div>

                                <!-- Saving Throws -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3 text-center">Saving Throws</h4>
                                    ${["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].map((throwName, index) => {
                                        const mod = modCalc(Stats[index]);
                                        return `<p><b>${throwName}</b>: ${mod >= 0 ? "+" : ""}${mod}</p>`;
                                    }).join('')}
                                </div>

                                <!-- Race and Subrace Features -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Race Features</h4>
                                    ${raceFeatures.map((feature) => {
                                        if(feature.name!=="Subrace")
                                        {
                                            return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                        }
                                        else
                                        {
                                            return ``;
                                        }
                                        
                                    }).join('')}
                                </div>

                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Subrace Features</h4>
                                    ${subraceFeatures.map((feature) => {
                                        return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>

                            


                            <!-- Right Column: Combat & Weapon Attacks -->
                            <div class="col-md-6">
                                <!-- Combat Box -->
                                <div class="card shadow-sm mb-4 p-3">
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
                            <input id="armorClass" type="number" value=10 class="form-control bg-light"/>
                        </div>

                        <!-- Speed -->
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Walking Speed</label>
                            <div class=" bg-light"><input 
                            type="number" 
                            class="form-control" 
                            value="${raceDataResponse.speed}" 
                            min="0"  
                            /></div>
                        </div>
                    </div>
                                </div>

                                <!-- Weapon Attacks -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="fw-bold mb-3">Weapon Attacks</h4>
                                    <p>Weapon Attack 1: Placeholder for weapon stats</p>
                                    <p>Weapon Attack 2: Placeholder for weapon stats</p>
                                    <p>Weapon Attack 3: Placeholder for weapon stats</p>
                                </div>
                            
                            <!-- Equipment Section -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Equipment</h4>
                                    ${equipmentFields.map((field, index) => {
                                        return `
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" value="${field.itemName}" placeholder="Enter equipment name..." />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" class="form-control" value="${field.itemQuantity}" min="1" placeholder="Enter quantity" />
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            
                            
                                </div>
                        </div>
                    </div>

                    
                `;

                

                setSave(tempSave);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchAllData();
    }, [selectedRaceId, selectedSubraceId, ClassId, SubclassId, ChosenClassFeatureId, FinalCharacterLevel, Stats]);

    return (
        <div className="CollectedDataTest">
            {save && <div dangerouslySetInnerHTML={{ __html: save }} />}
        </div>
    );
}

export default CollectedDataTest;
