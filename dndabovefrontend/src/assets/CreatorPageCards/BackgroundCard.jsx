import React, { useState, useEffect } from "react";
import "../Cards.css"; // Import styles




function BackgroundCard() 
{

    
const [skillDropdown1Open, setSkillDropdown1Open] = useState(false);
const [skillDropdown2Open, setSkillDropdown2Open] = useState(false);
const [chosenSkills, setChosenSkills] = useState([]);
const [skillsDone, setSkillsDone] = useState(false);
const [skills, setSkills] = useState([["Acrobatics","DEX"],["Animal Handling","WIS"],["Arcana","INT"],["Athletics","STR"],["Deception","CHA"],["History","INT"],["Insight","WIS"],["Intimidiation","CHA"],["Investigation","INT"],["Medicine","WIS"],["Nature","INT"],["Perception","WIS"],["Performance","CHA"],["Persuasion","CHA"],["Religion","INT"],["Sleight of Hand","DEX"],["Stealth","DEX"],["Survival","WIS"]]);

useEffect(() => {
    chosenSkills.length == 2 ? setSkillsDone(true) : setSkillsDone(false);
},[chosenSkills]);

function Background() 
{

}


return(
    <div className="background-container">
    <h2 className="background-title">Background</h2>


    {/*Chosen skill 1*/}
    {/* Dropdown Button */}
    <div className="dropdown-wrapper">
    <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button"
        onClick={() => {setSkillDropdown1Open(!skillDropdown1Open);}}
        id="plsbepink"
    >
        Select Skill
    </button>
    {skillDropdown1Open && (
        <div className="dropdown-menu show">
        {skills.map( (skill, stat) =>(
            <button
            className="dropdown-item"
            onClick={() => {setSkillDropdown1Open(false);var temp = chosenSkills; temp.push(skill[0]); setChosenSkills(temp); temp = [];}}
            >
            {skill[0]}
            </button>
            ))}
        </div>
    )}
    </div>

    {/*Chosen skill 2*/}
    <div className="dropdown-wrapper">
    <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button"
        onClick={() => {setSkillDropdown2Open(!skillDropdown2Open);}}
        id="plsbepink"
    >
        Select Skill
    </button>
    {skillDropdown2Open && (
        <div className="dropdown-menu show">
        {skills.map( (skill, stat) =>(
            <button
            className="dropdown-item"
            onClick={() => {setSkillDropdown2Open(false);var temp = chosenSkills; temp.push(skill[0]); setChosenSkills(temp); temp = [];}}
            >
            {skill[0]}
            </button>
            ))}
        </div>
    )}
    </div>

    {/* Display Selected backgrounds BELOW the dropdown */}
    <div className="selected-backgrounds">
    {skillsDone &&( <Background/>)}
        
    </div>
</div>
)
}

export default BackgroundCard




