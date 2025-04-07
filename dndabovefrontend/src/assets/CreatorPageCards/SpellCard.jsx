import { useState, useEffect, use } from "react"
import spellLevelCalc from "../CommonFunctions/spellLevelCalc";
import fetchEverything from "../CommonFunctions/fetchEverything";
import profCalc from "../CommonFunctions/profCalc";

function SpellCard()
{
    const [spells, setSpells] = useState(undefined);
    const [eligibleSpells, setEligibleSpells] = useState(undefined);
    const [chosenSpellId, setChosenSpellId] = useState(-1);
    const [highestSpellLevel, setHighestSpellLevel] = useState();
    const [availableSpellLevels, setAvailableSpellLevels] = useState([]);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [chosenSpellLevel, setChosenSpellLevel] = useState(0);

    const [characterLevel] = useState(1);
    const [chosenClassId] = useState(14);
    const [spellCastingAbilityModifier] = useState(5);

    useEffect(()=>{
        var halfCaster = false;
        var spellCaster = true;
        var temp = [];
        
        setHighestSpellLevel(spellLevelCalc(spellCaster,halfCaster,characterLevel));
        setProficiencyBonus(profCalc(characterLevel));
        for (let i = 0; i <= highestSpellLevel; i++) {
            temp.push(i);
        }
        setAvailableSpellLevels(temp);

        async function fetchSpells()
        {
            var templist;
            setSpells(await fetchEverything("Spells/"+chosenClassId));
            spells !== undefined ?(
            spells.forEach(spell => {
                if (spell.level <= highestSpellLevel)
                {
                    templist.push(spell);
                }
            })):null;
            setEligibleSpells(templist);
        }

        fetchSpells();
    }, [chosenClassId, characterLevel])

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
            </div>
            </>
        )
    }
    


    return(
        <>
        <SpellCard/>
        </>
    )
}

export default SpellCard