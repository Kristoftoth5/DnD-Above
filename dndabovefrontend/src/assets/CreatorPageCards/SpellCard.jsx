import React,{ useState, useEffect, useContext } from "react"
import spellLevelCalc from "../CommonFunctions/spellLevelCalc";
import fetchEverything from "../CommonFunctions/fetchEverything";
import profCalc from "../CommonFunctions/profCalc";
import "../Cards.css"; 
function SpellCard({ClassId})
{
    const [spells, setSpells] = useState([]);
    const [eligibleSpells, setEligibleSpells] = useState([]);
    const [displayEligibleSpells, setDisplayEligibleSpells] = useState([]);
    const [highestSpellLevel, setHighestSpellLevel] = useState();
    const [availableSpellLevels, setAvailableSpellLevels] = useState([]);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [chosenSpellLevel, setChosenSpellLevel] = useState(undefined);
    const [chosenSpellIds, setChosenSpellIds] = useState([]);
    const [chosenSpellsLimit, setChosenSpellsLimit] = useState(1);
    const [chosenCantripsLimit, setChosenCantripsLimit] = useState(2);
    const [chosenCantripsNumber, setChosenCantripsNumber] = useState(0);
    const [chosenSpells, setChosenSpells] = useState([{}]);

    const [characterLevel] = useState(6);
    const [spellCaster, setSpellCaster] = useState(0);
    const [halfCaster, setHalfCaster] = useState(0);
    const [spellCastingAbilityModifier] = useState(5);

    const [lastFetchedClassId, setLastFetchedClassId] = useState(null);


    useEffect(()=>{
        async function fetchSpells()
        {
            if (!ClassId || ClassId === lastFetchedClassId) return;
            try 
            {
                const response = await fetchEverything("Spells/originclassid/"+ClassId);
                const classData = await fetchEverything("Classes/"+ClassId)
                console.log("Fetched Spells:", response);
                if (response && Array.isArray(response)) 
                {
                    setSpells(response); // Only set if it's an array
                    setLastFetchedClassId(ClassId);
                }
                if(classData && Array.isArray(classData))
                {
                    setSpellCaster(classData.spellcaster);
                    setHalfCaster(classData.halfcaster);
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
    }, [ClassId, lastFetchedClassId])

    useEffect(() => {
        if(spells !== undefined)
        {
            var temp = [];
            
            setHighestSpellLevel(spellLevelCalc(spellCaster,halfCaster,characterLevel));
            setProficiencyBonus(profCalc(characterLevel));
            for (let i = 0; i <= highestSpellLevel; i++) {
                temp.push(i);
            }
            console.log("nemhiszemel: " + temp)
            setAvailableSpellLevels(temp);
            setChosenCantripsLimit(Math.floor(characterLevel/4));
            setChosenSpellsLimit(characterLevel+spellCastingAbilityModifier);


            if (spells.length > 0 && highestSpellLevel !== undefined) {
                const filteredSpells = spells.filter(spell => spell.level <= highestSpellLevel);
                setEligibleSpells(filteredSpells);
                setDisplayEligibleSpells(eligibleSpells);
            }
        }
        
    }, [spells, highestSpellLevel]);

    useEffect(()=>{
        var temparray = [{}]
        async function fetchspells()
        {
            chosenSpellIds.forEach(async id =>{
                temparray.push(await fetchEverything("Spells/"+id));
            })
        }
        fetchspells();
        if(temparray !== chosenSpells)setChosenSpells(temparray);
    },[chosenSpellIds])


    function spellSelect(id, level)
    {
        if(level == 0 & chosenCantripsNumber == chosenCantripsLimit)return;
        else if(level != 0 & chosenSpellsLimit == chosenSpellIds.length)return; 
        var temparray = [...chosenSpellIds];
        var temp = 0;
        level == 0 ? temp = chosenCantripsNumber : null;
        if(!temparray.includes(id)) temparray.push(id);
        temp++;
        setChosenSpellIds(temparray);
        level == 0 ? setChosenCantripsNumber(temp):null;
        console.log(chosenSpellIds);
    }

    function spellDeselect(id, level)
    {
        var temparray = [...chosenSpellIds];
        var temp = 0;
        level == 0 ? temp = chosenCantripsNumber : null;
        var isId = (element) => element == id;
        temparray.length !== 0 ? temparray.splice(temparray.findIndex(isId),1) : null;
        temp--;
        setChosenSpellIds(temparray);
        level == 0 ? setChosenCantripsNumber(temp):null;
        console.log(chosenSpellIds);
    }

    function spellRemoveDisplay(id)
    {
        var temparray = [...displayEligibleSpells];
        console.log(temparray)
        var isId = (element) => element.id == id;
        temparray.length !== 0 ? temparray.splice((temparray.findIndex(isId)),1):null;
        setDisplayEligibleSpells(temparray)
    }

    async function SpellAddDisplay(id)
    {
        var temparray = [...displayEligibleSpells];
        temparray.push(await fetchEverything("Spells/"+id))
        setDisplayEligibleSpells(temparray)
    }

    function showDetails(data)
    {
        window.alert(data);
    }

    function AvailableSpells()
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
                                    <th>Add Spell</th>
                                </tr>
                            </thead>
                            <tbody>
                        {eligibleSpells.map((spell, id)=>(
                            spell.level === chosenSpellLevel ?(
                            <tr key={id}>
                                <td>{spell.name}</td>
                                <td>Level {spell.level} {spell.school}</td>
                                <td>{spell.castingTime}<sup>{spell.ritual == 1 ? (<i>R</i>):(null)}</sup></td>
                                <td>{spell.range}</td>
                                <td>{spell.components}{spell.componentprice !== 0 ?(<sup><b>{spell.componentprice}</b></sup>):null}</td>
                                <td>{spell.duration}<sup>{spell.concentration == 1 ? (<b>C</b>):(null)}</sup></td>
                                <td><button className="btn btn-primary" onClick={()=>{showDetails(spell.description)}}>?</button></td>
                                {!chosenSpellIds.includes(spell.id)?(<td><button className="btn btn-primary" onClick={()=>{spellSelect(spell.id, spell.level); spellRemoveDisplay(spell.id)}}>Add</button></td>):<td><button className="btn btn-primary" onClick={()=>{spellDeselect(spell.id, spell.level); SpellAddDisplay(spell.id)}}>Remove</button></td>}
                            </tr>):null
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

    function SelectedSpells()
    {   
        return(
            <>
            {chosenSpells.length !== 0 ? (
                <>
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
                                    <th>Add Spell</th>
                                </tr>
                            </thead>
                            <tbody>
                        { chosenSpells.map((spell, index)=>(
                            <tr key={index}>
                                <td>{spell.name}</td>
                                <td>Level {spell.level} {spell.school}</td>
                                <td>{spell.castingTime}<sup>{spell.ritual == 1 ? (<i>R</i>):(null)}</sup></td>
                                <td>{spell.range}</td>
                                <td>{spell.components}</td>
                                <td>{spell.duration}<sup>{spell.concentration == 1 ? (<b>C</b>):(null)}</sup></td>
                                <td><button className="btn btn-primary" onClick={()=>{showDetails(spell.description)}}>?</button></td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                        </>
            ):null}
            </>
        )
    }
    


    return(
    <>
        {spellCaster !== 0 || halfCaster !== 0 ?(
        <>
        <div className="creator-container">
            <h2 className="creator-title">Spells</h2>
            <AvailableSpells/>
        </div>
        <div className="selected-multiple">
            {chosenSpellIds.length !== 0 ? (<SelectedSpells/>):null}
        </div>
        </>
    ):null}
    </>
    )
}

export default SpellCard