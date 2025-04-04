import React, { useState, useEffect } from "react";
import "../Cards.css"; // Import styles
import FinalDataTransfer from "../FinalDataTransfer";




function BackgroundCard() 
{

    
const [skillDropdown1Open, setSkillDropdown1Open] = useState(false);
const [skillDropdown2Open, setSkillDropdown2Open] = useState(false);
const [toolDropdownOpen, setToolDropdownOpen] = useState(false);
const [chosenSkills, setChosenSkills] = useState(["Acrobatics","Animal Handling"]);
const [chosenTool, setChosenTool] = useState("Alchemist's Supplies");
const [skills, setSkills] = useState([["Acrobatics","DEX"],["Animal Handling","WIS"],["Arcana","INT"],["Athletics","STR"],["Deception","CHA"],["History","INT"],["Insight","WIS"],["Intimidiation","CHA"],["Investigation","INT"],["Medicine","WIS"],["Nature","INT"],["Perception","WIS"],["Performance","CHA"],["Persuasion","CHA"],["Religion","INT"],["Sleight of Hand","DEX"],["Stealth","DEX"],["Survival","WIS"]]);
const [tools, setTools] = useState(["Aclhemist's Supplies","Brewer's supplies","Calligrapher's supplies","Carpenter's tools","Cartographer's tools","Cobbler's tools","Cook's utensils","Glassblower's tools","Jeweler's tools","Leatherworker's tools","Mason's tools","Painter's supplies","Potter's tools","Smith's tools","Tinker's tools","Weaver's tools","Woodcarver's tools"])


function Background() 
{
    return(
    <>
    <div className="background-details">
        <ul><b>Skill Proficiencies: </b> 
        {chosenSkills.map((skill)=>(
            <li>
            {skill}
            </li>
        ))}
         </ul>

        <p><b>Tool Proficiency: </b>{chosenTool}</p>

        <p><b>Equipment: </b>{chosenTool}, 15gp</p>

    </div>
    </>
    )
}


return(
    <>
    <div className="creator-container">
    <h2 className="creator-title">Background</h2>


    {/*Chosen skill 1*/}
    {/* Dropdown Button */}
    <div className="dropdown-wrapper">
    <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button"
        onClick={() => {setSkillDropdown1Open(!skillDropdown1Open);}}
        id="plsbepink"
    >
        Select Skill Proficiency
    </button>
    {skillDropdown1Open && (
        <div className="dropdown-menu show">
        {skills.map( (skill, stat) =>(
            <button
            className="dropdown-item"
            onClick={() => {setSkillDropdown1Open(false);var temp = chosenSkills; temp[0]=skill[0]; setChosenSkills(temp); temp = [];}}
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
        Select Skill Proficiency
    </button>
    {skillDropdown2Open && (
        <div className="dropdown-menu show">
        {skills.map( (skill, stat) =>(
            <button
            className="dropdown-item"
            onClick={() => {setSkillDropdown2Open(false);var temp = chosenSkills; temp[1]=skill[0]; setChosenSkills(temp); temp = [];}}
            >
            {skill[0]}
            </button>
            ))}
        </div>
    )}
    </div>

    {/*Chosen Tool*/}
    <div className="dropdown-wrapper">
    <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button"
        onClick={() => {setToolDropdownOpen(!toolDropdownOpen);}}
        id="plsbepink"
    >
        Select Tool Proficiency
    </button>
    {toolDropdownOpen && (
        <div className="dropdown-menu show">
        {tools.map( (tool) =>(
            <button
            className="dropdown-item"
            onClick={() => {setToolDropdownOpen(false);setChosenTool(tool);}}
            >
            {tool}
            </button>
            ))}
        </div>
    )}
    </div>

    {/*Background Details written by User */}
    <div>
        <p><input type="text" id="background-name" placeholder="The name of your background." size={30}/></p>
        <p><textarea id="background-description" placeholder="You can write the details of what a character with this background could be like." cols={60} rows={15}></textarea></p>
    </div>



    {/* Display Selected backgrounds BELOW the dropdown */}
    <div className="selected multiple">
    <Background/>
    <FinalDataTransfer BgTool={chosenTool} BgSkillProfList={chosenSkills}/>
        
    </div>
</div>

</>
)
}

export default BackgroundCard




