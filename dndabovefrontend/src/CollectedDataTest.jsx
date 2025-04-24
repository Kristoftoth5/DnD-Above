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
                const classFeaturesResponse = await fetchEverything("Features/originclassid/" + ClassId);
                const subClassFeaturesResponse = await fetchEverything("Features/originsubclassid/" + SubclassId);
                const subRaceFeaturesResponse = await fetchEverything("FeaturesToFeaturesConnections/originfeatureid/" + selectedSubraceId);

                
                
                var filteredClassFeatures = [];
                var filteredSubClassFeatures = [];
                if(classFeaturesResponse.length!==0&&classFeaturesResponse!==undefined)
                {
                    var seen = new Set();
                    try
                    {
                        classFeaturesResponse.map((feature,index)=>{
                            if (feature.levelReq <= FinalCharacterLevel && !seen.has(feature.name)) 
                            {
                                filteredClassFeatures.push(feature)
                                seen.add(feature.name);
                            }
                        });
                    }

                    catch(error)
                    {
                        console.log("There was an error fetching class features: ",error);
                    }
                    
                }
                

                for(const id of ChosenClassFeatureId)
                {
                    try
                    {
                        filteredClassFeatures.push(await fetchEverything("Features/"+id));
                    }
                    catch(error)
                    {
                        console.log("There was an error fetching chosen subfeature results: ",error)
                    }
                }

                if(subClassFeaturesResponse.length!==0&&subClassFeaturesResponse!==undefined)
                    {
                        try
                        {
                            subClassFeaturesResponse.map((feature,index)=>{
                                if(!filteredSubClassFeatures.includes(feature)&&feature.levelReq<=FinalCharacterLevel)
                                {
                                    filteredSubClassFeatures.push(feature);
                                }
                            })
                        }
    
                        catch(error)
                        {
                            console.log("There was an error fetching subclass features: ",error);
                        }
                        
                    }
                
                
                


                // Store race and subrace features
                setRaceFeatures(raceFeaturesResponse);
                setSubraceFeatures(subRaceFeaturesResponse);

                // Calculate stats
                const profBonus = profCalc(FinalCharacterLevel);
                const conMod = modCalc(Stats[2]);
                const hitDice = diceToInteger(classDataResponse.hitDice);
                const maxHpCalc = (FinalCharacterLevel * conMod) + (FinalCharacterLevel * (hitDice / 2));
                setCurrentHP(maxHpCalc); // Set Current HP

                // Collect proficiencies
                let skillProfs = [];
                let weaponProfs = [];
                let armorProfs = [];

                if(raceFeaturesResponse!==undefined&&raceFeaturesResponse.length!==0)
                {
                    try
                    {
                        raceFeaturesResponse.forEach((element) => {
                            if (element.skillProf.length !== 0) {
                                element.skillProf.forEach(prof => {
                                    !skillProfs.find(item=>item === prof)?skillProfs.push(prof):null;
                                });
                            }
                            if (element.armorProf.length !== 0) {
                                element.armorProf.forEach(prof => {
                                    !armorProfs.find(item=>item === prof)?armorProfs.push(prof):null;
                                });
                            }
                            if (element.weaponProf.length !== 0) {
                                element.weaponProf.forEach(prof => {
                                    !weaponProfs.find(item=>item === prof)?weaponProfs.push(prof):null;
                                });
                            }
                            
                        });
                    }
                    catch(error)
                    {
                        console.log("There was an error processing race features: ",error)
                    }
                }
                

                if(classDataResponse!==undefined&&classDataResponse.length!==0)
                {
                    try
                    {
                        if (classDataResponse.armorProf.length !== 0) {
                            classDataResponse.armorProf.forEach(prof => {
                                !armorProfs.find(item=>item === prof)?armorProfs.push(prof):null;
                            });
                        }
                        if (classDataResponse.weaponProf.length !== 0) {
                            classDataResponse.weaponProf.forEach(prof => {
                                !weaponProfs.find(item=>item === prof)?weaponProfs.push(prof):null;
                            });
                        }
                    }
                    catch(error)
                    {
                        console.log("There was an error processing class data: ",error)
                    }
                }

                if(subRaceFeaturesResponse!==undefined&&subRaceFeaturesResponse.length!==0)
                {
                    try
                    {
                        subRaceFeaturesResponse.forEach((element) => {
                            if (element.skillProf.length !== 0) {
                                element.skillProf.forEach(skill => {
                                    skillProfs.push(skill);
                                });
                            }
                        });
                    }
                    catch(error)
                    {
                        console.log("There was an error processing subrace features: ",error)
                    }
                }

                

                

                BgSkills.forEach((element)=>{
                    if(!skillProfs.find(item=>item === element))
                    {
                        skillProfs.push(element);
                    }
                })


                
            
                // Equipment Section
                const EquipmentData=[];
                const strength = Stats[0]; // Strength stat
                const equipmentFields = [];
                const equipmentCount = strength * 3; // Calculate the number of fields based on Strength stat
                const weapons=[];
                if(Equipment !== undefined&&Equipment.length!==0)
                {
                    for (const id of Equipment) {
                        try {
                        EquipmentData.push(await fetchEverything(`Equipments/${id}`));
                        } catch (error) {
                        console.error(`Failed to fetch item with id ${id}`, error);
                        }
                    }
                    
                    if (Equipment&&EquipmentData) {
                    const equipmentMap = {};
                    let realItemCount = 0;

                        for (let i = 0; i < equipmentCount; i++) {
                            const item = EquipmentData[i];
                            if(!item)continue;
                            const key = item.name; // Customize if needed

                            if (equipmentMap[key]) 
                            {
                                equipmentMap[key].quantity += 1;
                            } 
                            else 
                            {
                                let armorBonus = "";
                                if (item.ac > 2) {
                                    if (item.equipmentType === "Light Armor") armorBonus = "+DEX";
                                    else if (item.equipmentType === "Medium Armor") armorBonus = "+DEX(Max. +2)";
                                    else if (item.equipmentType === "Heavy Armor") armorBonus = "";
                                }

                                const profHaveTemp =
                                    weaponProfs.includes(item.equipmentType) ||
                                    armorProfs.includes(item.equipmentType) ||
                                    weaponProfs.includes(item.name)
                                        ? 1
                                        : 0;

                                const temp = {
                                    name: item.name,
                                    equipmentType: item.equipmentType,
                                    properties: item.properties,
                                    damageDie: item.damageDie,
                                    damageType: item.damageType,
                                    ac: item.ac,
                                    rarity: item.rarity,
                                    consumable: item.consumable,
                                    description: item.description,
                                    attunement: item.attunement,
                                    armorBonus: armorBonus,
                                    profReq: item.profReq,
                                    profHave: profHaveTemp,
                                    quantity: 1,
                                };

                                equipmentMap[key] = temp;
                                equipmentFields.push(temp);
                                realItemCount++;
                            }
                        }

                        // Pad with blanks if needed
                        while (equipmentFields.length < equipmentCount) {
                            equipmentFields.push({
                                name: "",
                                equipmentType: "",
                                properties: [],
                                damageDie: "",
                                damageType: "",
                                ac: 0,
                                rarity: "",
                                consumable: "",
                                description: "",
                                attunement: "",
                                armorBonus: "",
                                profReq: "",
                                profHave: "",
                                quantity: 0,
                            });
                        }}
                
                
                //Weapon attacks calculation and filtering
                for (const item of equipmentFields) 
                {
                    if(item.damageDie!=="")
                    {
                        var temp={
                            name:item.name,
                            equipmentType:item.equipmentType,
                            properties:item.properties,
                            damageDie:item.damageDie,
                            damageType:item.damageType,
                            statIndex:item.properties.includes("Finesse") ? 1 : 0,
                            profReq:item.profReq,
                            profHave:item.profHave
                        }
                        
                        weapons.push(temp)
                    }
                }
                }
                
                if(equipmentFields?.length==0)
                {
                    for (let i = 0; i <= equipmentCount; i++) {
                        var temp={
                            name:"",
                            equipmentType:"",
                            properties:[],
                            damageDie:"",
                            ac:0,
                            rarity:"",
                            consumable:"",
                            description:"",
                            attunement:"",
                            armorBonus:"",
                            profHave:"",
                            quantity:0
                        }
                        equipmentFields.push(temp);
                    }
                }

                if(!weapons?.length>0)
                {
                    var temp={
                        name:"Weapon name",
                        equipmentType:"Item's Type(Armor, weapon)",
                        properties:"Properties(Finesse, loud)",
                        damageDie:"Damage dice",
                        damageType:"Damage type",
                        statIndex:0,
                        profReq:0,
                        profHave:1
                    }
                        
                    weapons.push(temp)

                    var temp={
                        name:"",
                        equipmentType:"",
                        properties:"",
                        damageDie:"",
                        damageType:"",
                        statIndex:0,
                        profReq:0,
                        profHave:1
                    }
                        
                    weapons.push(temp)

                    var temp={
                        name:"",
                        equipmentType:"",
                        properties:"",
                        damageDie:"",
                        damageType:"",
                        statIndex:0,
                        profReq:0,
                        profHave:1
                    }
                        
                    weapons.push(temp)
                }

                
                //Spells section
                const spellData=[];
                if(FinalSpells?.length>0)
                {
                    for(const id of FinalSpells)
                    {
                        try
                        {
                            spellData.push(await fetchEverything("Spells/"+id));
                        }
                        catch(error)
                        {
                            console.log("There was an error fetching chosen spell results: ",error)
                        }
                    }
                }

                spellData.sort((a, b) => a.level - b.level)
                
                


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

                                        <div class="col-md-2">
                                            <label class="form-label fw-bold">Race</label>
                                            <div id="characterRace">${raceDataResponse.name}</div>
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label fw-bold">Background</label>
                                            <div id="characterRace">${BgName}</div>
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
                                    <div class="card shadow-sm mb-3 mx-auto" style="width: 130px;">
                                                <div class="card-body text-center p-3">
                                                    <h6 class="card-title mb-1">Proficiency Bonus</h6>
                                                    <p class="fw-bold mb-1">+${profBonus}</p>
                                                </div>
                                    </div>
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
                                        var mod=modCalc(Stats[index]);
                                        if(classDataResponse.savingThrows.includes(throwName))
                                        {
                                            mod = modCalc(Stats[index])+profBonus;
                                        }
                                        
                                        return `<p><b>${throwName}</b>: ${mod >= 0 ? "+" : ""}${mod}</p>`;
                                    }).join('')}
                                </div>

                                <!-- Race and Subrace Features -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Race Features</h4>
                                    ${raceFeaturesResponse.map((feature) => {
                                        if(feature.name!=="Subrace")
                                        {
                                            return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                        }
                                        
                                    }).join('')}
                                </div>

                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Subrace Features</h4>
                                    ${subRaceFeaturesResponse!==undefined&&subRaceFeaturesResponse.length!==0?subRaceFeaturesResponse.map((feature) => {
                                        return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                    }).join(''):''}
                                </div>

                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Class Features</h4>
                                    ${filteredClassFeatures!==undefined&&filteredClassFeatures.length!==0?filteredClassFeatures.map((feature) => {
                                        return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                    }).join(''):''}
                                </div>

                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Subclass Features</h4>
                                    ${filteredSubClassFeatures!==undefined&&filteredSubClassFeatures.length!==0?filteredSubClassFeatures.map((feature) => {
                                        return `
                                            <div class="mb-3">
                                                <h5 class="fw-bold">${feature.name}</h5>
                                                <p>${feature.description}</p>
                                            </div>
                                        `;
                                    }).join(''):''}
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
                            value="${maxHpCalc}" 
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
                                    ${weapons?.length?weapons.map((weapon, index)=>{
                                        var amod;
                                        var dmod;
                                        weapon.profHave==1?amod=modCalc(Stats[weapon.statIndex])+profBonus:amod=modCalc(Stats[weapon.statIndex]);
                                        dmod = modCalc(Stats[weapon.statIndex]);

                                        return `<p><b><input value="${weapon.name}"></input></b><input value="${amod>=0?"+":""}${amod}"> </input>  <input value="${weapon.damageDie} ${dmod>=0?"+":""}${dmod} ${weapon.damageType}"> </input>  </p>`
                                    }).join(''):''}
                                </div>
                                
                            
                            <!-- Equipment Section -->
                                <div class="card shadow-sm mb-4 p-3">
                                    <h4 class="mb-3">Equipment</h4>
                                    ${equipmentFields.map((field, index) => {
                                        return `
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" value="${field.name}" placeholder="Enter equipment name..." />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" class="form-control" value="${field.quantity}" min="1" placeholder="Enter quantity" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" value="${field.properties}"placeholder="(Properties,Rarity, etc.)" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" value="${field.equipmentType}(${field.ac!=0?'AC '+field.ac+field.armorBonus:field.damageDie})" placeholder="" />
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                
                                
                                
                                    
                                        
                        </div>
                    </div>

                    <!-- Spells Section -->
                                <div class="card shadow-sm mb-4 p-3">
                                <h4 class="mb-3">Spells</h4>

                                ${spellData?.length > 0 ? spellData.map((spell, index) => {
                                    return `
                                    <table style="margin-bottom: 16px; width: 100%; border-collapse: collapse; table-layout: fixed;">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>School & Level</th>
                                                <th>Casting Time</th>
                                                <th>Range</th>
                                                <th>Components</th>
                                                <th>Duration</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${spell.name}</td>
                                                <td>Level ${spell.level} ${spell.school}</td>
                                                <td>
                                                    ${spell.castingTime}${spell.ritual === 1 ? '<sup><i>R</i></sup>' : ''}
                                                </td>
                                                <td>${spell.range}</td>
                                                <td>
                                                    ${spell.component}${spell.componentPrice ? `<sup>${spell.componentPrice}GP</sup>` : ''}
                                                </td>
                                                <td>
                                                    ${spell.duration}${spell.concentration === 1 ? '<sup><b>C</b></sup>' : ''}
                                                </td>
                                                <td>
                                                    <button onclick="
                                                        const descRow = document.getElementById('desc-${index}');
                                                        descRow.style.display = descRow.style.display === 'none' ? 'table-row' : 'none';
                                                        this.innerText = descRow.style.display === 'none' ? 'Show' : 'Hide';
                                                    ">Show</button>
                                                </td>
                                            </tr>
                                            <tr id="desc-${index}" style="display: none; background-color: #f9f9f9;">
                                                <td colspan="7">
                                                    <div style="padding: 10px;">
                                                        <strong>Description:</strong><br>
                                                        ${spell.description || 'No description available.'}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    `;
                                }).join('') : ''}
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
        <br/><br/>
            {save && <div dangerouslySetInnerHTML={{ __html: save }} />}
        </div>
    );
}

export default CollectedDataTest;
