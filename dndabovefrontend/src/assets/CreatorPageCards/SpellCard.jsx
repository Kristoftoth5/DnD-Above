import { useState, useEffect, use } from "react"
import spellLevelCalc from "../CommonFunctions/spellLevelCalc";
import fetchEverything from "../CommonFunctions/fetchEverything";
import profCalc from "../CommonFunctions/profCalc";
import "../Cards.css"; 

function SpellCard({chosenClassId})
{
    const [spells, setSpells] = useState([]);
    const [eligibleSpells, setEligibleSpells] = useState([]);
    const [displayEligibleSpells, setDisplayEligibleSpells] = useState([]);
    const [highestSpellLevel, setHighestSpellLevel] = useState();
    const [availableSpellLevels, setAvailableSpellLevels] = useState([]);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [chosenSpellLevel, setChosenSpellLevel] = useState(undefined);
    const [chosenSpells, setChosenSpells] = useState([]);

    const [characterLevel] = useState(6);
    const [spellCastingAbilityModifier] = useState(5);

    useEffect(()=>{
        async function fetchSpells()
        {
            console.log("ChosenClassId: "+chosenClassId)
            try 
            {
                const response = await fetchEverything("Spells/originclassid/"+chosenClassId);
                console.log("Fetched Spells:", response);
                if (response && Array.isArray(response)) 
                {
                    setSpells(response); // Only set if it's an array
                }
                else 
                {
                    console.error("Error: Fetched response is not an array.");
                }
            }
            catch (error) 
            {
                console.error("Error fetching spells:", error);
            }
        }
        fetchSpells(); 
    }, [chosenClassId])

    useEffect(() => {
        if(spells !== undefined)
        {
            var halfCaster = false;
            var spellCaster = true;
            var temp = [];
            
            setHighestSpellLevel(spellLevelCalc(spellCaster,halfCaster,characterLevel));
            setProficiencyBonus(profCalc(characterLevel));
            for (let i = 0; i <= highestSpellLevel; i++) {
                temp.push(i);
            }
            console.log("nemhiszemel: " + temp)
            setAvailableSpellLevels(temp);


            if (spells.length > 0 && highestSpellLevel !== undefined) {
                const filteredSpells = spells.filter(spell => spell.level <= highestSpellLevel);
                setEligibleSpells(filteredSpells);
            }
        }
        
    }, [spells, highestSpellLevel]);

    function spellSelect(id)
    {
        var temparray = chosenSpells;
        temparray.push(id);
        setChosenSpells(temparray);
    }

    function spellDeselect(id)
    {
        var temparray = [...chosenSpells];
        temparray.length !== 0 ? temparray.splice(temparray.findIndex(element === id),1) : null;
        setChosenSpells(temparray);
    }

    function spellRemoveDisplay(id)
    {
        var temparray = [...displayEligibleSpells];
        console.log(temparray)
        temparray.length !== 0 ? temparray.splice((temparray.findIndex(element.id === id)),1):null;
        setDisplayEligibleSpells(temparray)
    }

    function SelectedSpells()
    {
        return(
            <>
            <p><b>Spellcasting Class Name</b></p>
            <p><b>Spellcasting DC: </b> {8 + spellCastingAbilityModifier + proficiencyBonus} </p>
            <p><b>Spell Attack Bonus: </b> {spellCastingAbilityModifier + proficiencyBonus} </p>

            {/* Dropdown Button */}
            <div className="dropdown-wrapper">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                onClick={() => { setDropdownOpen(!dropdownOpen); }}
                id="plsbepink"
            >
                Select Spell Level
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="dropdown-menu show">
                {availableSpellLevels.map((level, id) => (
                    level == 0 ? (
                    <button
                    className="dropdown-item"
                    onClick={() => { setChosenSpellLevel(level); setDropdownOpen(false); }}
                    key={id}
                    >
                    Cantrips
                    </button>): 
                    <button
                    className="dropdown-item"
                    onClick={() => { setChosenSpellLevel(level); setDropdownOpen(false); }}
                    key={id}
                    >
                    Level {level} spells
                    </button>
                ))}
                </div>
            )}


            <div className="selected-multiple">
                {chosenSpellLevel !== undefined & !dropdownOpen? (
                    <>
                    {chosenSpellLevel == 0 ? (<h3>Cantrips</h3>):(<h3>Level {chosenSpellLevel} Spells</h3>)}
                    <table>
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
                        {eligibleSpells.map((spell, id)=>(
                            <tr key={id}>
                                <td>{spell.name}</td>
                                <td>Level {spell.level} {spell.school}</td>
                                <td>{spell.castingTime}<sup>{spell.ritual == 1 ? (<i>R</i>):(null)}</sup></td>
                                <td>{spell.range}</td>
                                <td>{spell.components}</td>
                                <td>{spell.duration}<sup>{spell.concentration == 1 ? (<b>C</b>):(null)}</sup></td>
                                <td><button className="btn btn-primary" onClick={()=>{spellSelect(spell.id); spellRemoveDisplay(spell.id)}}></button></td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                        </>
                ):null}

            </div>
            </div>
            </>
        )
    }
    


    return(
        <>
        <div className="creator-container">
            <h2 className="creator-title">Spells</h2>
            <SelectedSpells/>
        </div>
        </>
    )
}

export default SpellCard