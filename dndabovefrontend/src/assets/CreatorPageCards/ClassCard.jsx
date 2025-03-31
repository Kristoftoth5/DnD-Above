import { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything"
import diceToInteger from "../CommonFunctions/diceToInteger"
import "../Cards.css"; // Import styles

function ClassCard()
{

    const [classOptions, setClassOptions] = useState();
    const [classFeatures, setClassFeatures] = useState();
    const [chosenClassId, setChosenClassId] = useState(0);
    const [classData, setClassData] = useState();
    const [subClassOptions, setSubClassOptions] = useState();
    const [subClassFeatures, setSubClassFeatures] = useState();
    const [subClassName, setSubClassName] = useState();
    const [chosenSubClassId, setChosenSubClassId] = useState(0);

    const [characterLevel, setCharacterLevel] = useState(0);

    const [subClassDropdownOpen, setSubClassDropdownOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*Fetching all the classes at startup */
  useEffect(()=>{
    async function fetchclasses()
    {
    const classOptionsJSON = await fetchEverything("Classes");

      var fasz = [];
      var fasz2 = [];
    classOptionsJSON.forEach(characterclass => {
      fasz2.push(characterclass.name);
      fasz2.push(characterclass.id);

      fasz.push(fasz2);
      fasz2 = [];
    });
    setClassOptions(fasz);
    }
    fetchclasses();
  },[]);

  useEffect(()=>{
    async function fetchdatabyid() 
    {
      setClassData(await fetchEverything("Classes/"+chosenClassId));

      setClassFeatures(await fetchEverything("Features/Features/originclassid/"+chosenClassId));

      setSubClassFeatures(undefined);

      setSubClassName(undefined);

    }
    fetchdatabyid()
  },[chosenClassId]);

  

 useEffect(()=>{
    async function fetchsubclasses(id) {
      const subClassOptionsJSON = await fetchEverything("SubClasses/SubClasses/originclassid/"+id)
      var fasz = [];
      var fasz2 = [];
    subClassOptionsJSON.map((subclass,id) => {
      fasz2.push(subclass.name);
      fasz2.push(subclass.id);

      fasz.push(fasz2);
      fasz2 = [];
    });
    setSubClassOptions(fasz);
    }
    fetchsubclasses(chosenClassId);
 },[chosenClassId])

 useEffect(()=>{
  async function fetchsubracefeatures(id)
  {
    setSubClassFeatures(await fetchEverything("Features/Features/originsubclassid/"+id));
  }
  

  var prevsubclassfeatures = subClassFeatures;
  
  if(chosenSubClassId !== 0)
  {
    fetchsubracefeatures(chosenSubClassId);
  }


  if (prevsubclassfeatures == subClassFeatures)
  {
    setSubClassFeatures(undefined);
    prevsubclassfeatures = undefined;
  }
},[chosenSubClassId])






  function SelectedClass()
  {
    return(
        <>
        {/* Displaying the Class's base details, such as Name, Description, Proficiencies, Hit Dice and Starting Gold*/}
          <p className="selected-singular"><b>Name: </b>{classData.name}</p>
          <p className="selected-singular"><b>Description: </b>{classData.description}</p>
          {classData.hitDice !== undefined ? <p className="selected-singular"><b>Hit Dice: </b>{classData.hitDice}(or {diceToInteger(classData.hitDice)/2+1})</p> : null}
          <p className="selected-singular"><b>Starting Gold: </b>{classData.startingGold}</p>


        {/* Displaying each feature of the class loaded into the classFeatures array*/}

        {classFeatures.map((feature, id)=>(
          feature.levelReq <= characterLevel ?(
            <div className="selected-feature">
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
            </div>
          ) : null
            
          ))}



       {/*All subclass related things */}
          {/* Dropdown Button */}

      
      <div className="dropdown-wrapper">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          onClick={() => {setSubClassDropdownOpen(!subClassDropdownOpen);}}
          id="plsbepink"
        >
          Select Subclass
        </button>

        {/* Dropdown Menu - Now positioned below the button */}
        {subClassDropdownOpen && (
          <div className="dropdown-menu show">
            {subClassOptions.map( (subclass, id) =>(
              <button
                className="dropdown-item"
                onClick={() => {setChosenSubClassId(subclass[1]);setSubClassDropdownOpen(false);setSubClassName(subclass[0]);}}
              >
              {subclass[0]}
              </button>
              ))}
          </div>
        )}
      </div>
      {subClassFeatures !== undefined ?(
        <h4>{subClassName}</h4>
      ):null}
      {subClassFeatures !== undefined ?(
      subClassFeatures.map((feature, id)=>(
        feature.levelReq <= characterLevel ?(
            <div className="selected-feature">
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
            </div>) : null  
          ))
       ): null }

        </>
    )
  }
return(
    <>
    <div className="creator-container">
      <h2 className="creator-title">Class</h2>

      {chosenClassId !== 0 ? (
        <div className="ability-box">
        <h3 className="ability-title">Character Level</h3>
        <div className="score-display">{characterLevel}</div>

        {/* Increase & Decrease Buttons */}
        <div className="button-group">
          <button className="btn-stat" onClick={() => !((characterLevel+1)>20) ? setCharacterLevel(characterLevel+1) : setCharacterLevel(characterLevel)}>+</button>
          <button className="btn-stat" onClick={() => (characterLevel-1)!=0 ? setCharacterLevel(characterLevel-1) : setCharacterLevel(characterLevel)()}>-</button>
        </div>

      </div>
      ):null}
      

    {/* Dropdown Button */}
    <div className="dropdown-wrapper">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          onClick={() => {setDropdownOpen(!dropdownOpen);}}
          id="plsbepink"
        >
          Select Class
        </button>

        {/* Dropdown Menu - Now positioned below the button */}
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {classOptions.map( (characterclass, id) =>(
              <button
                className="dropdown-item"
                onClick={() => {setChosenClassId(characterclass[1]);setDropdownOpen(false);}}
              >
              {characterclass[0]}
              </button>
              ))}
          </div>
        )}
      </div>

      

      


    <div className="selected-multiple">
        {Boolean(chosenClassId != 0) & classFeatures !== undefined & classData !== undefined ?(
            <SelectedClass/>):null}
    </div>
    </div>
    </>
)
}
export default ClassCard