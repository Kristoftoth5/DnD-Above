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
    const [subClassNames, setSubClassNames] = useState();
    const [chosenSubClassId, setChosenSubClassId] = useState(0);

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
    }
    fetchdatabyid()
    console.log(classFeatures);
  },[chosenClassId]);

  /*Fetching the subclasses of a class*/
  useEffect(()=>{
    async function fetchsubclassthings(id)
    {
      const subClassOptionsJSON = await fetchEverything("SubClasses/"+id);

      var fasz = [];
      var fasz2 = [];
    subClassOptionsJSON.forEach(subclass => {
      fasz2.push(subclass.name);
      fasz2.push(subclass.id);

      fasz.push(fasz2);
      fasz2 = [];
    });
    setSubClassOptions(fasz);
    }

    var prevsubclassoptions = subClassOptions;

    var prevsubclassoptions;
    
    

    if (prevsubraceoptions == subRaceOptions)
    {
      setSubRaceOptions(undefined);
      prevsubraceoptions = undefined;
    }
  },[raceFeatures])

  /*Fetching the features of the subrace if there was one */
  useEffect(()=>{
    async function fetchsubracefeatures(id)
    {
      setSubRaceFeatures(await fetchEverything("FeaturesToFeaturesConnections/"+id));
    }
    

    var prevsubracefeatures = subRaceFeatures;
    
    if(chosenSubRaceId !== 0)
    {
      fetchsubracefeatures(chosenSubRaceId);
    }


    if (prevsubracefeatures == subRaceOptions)
    {
      setSubRaceFeatures(undefined);
      prevsubracefeatures = undefined;
    }
  },[chosenSubRaceId])




  function SelectedClass()
  {
    return(
        <>
        {/* Displaying the Class's base details, such as Name, Description, Proficiencies, Hit Dice and Starting Gold*/}
          <p className="selected-singular"><b>Name: </b>{classData.name}</p>
          <p className="selected-singular"><b>Description: </b>{classData.description}</p>
          {classData.hitDice !== undefined ? <p className="selected-singular"><b>Hit Dice: </b>{classData.hitDice}(or {diceToInteger(classData.hitDice)/2+1})</p> : null}
          <p className="selected-singular"><b>Starting Gold: </b>{classData.startingGold}</p>


        {/* Displaying each feature of the race loaded into the raceFeatures array*/}

        {classFeatures.map((feature, id)=>(
            <div className="selected-feature">
              <p><b>{feature.name}</b></p>
              <p><b>Description: </b>{feature.description}</p>
            </div>
          ))}



        {/* All Subclass Related things*/}
        <h3>Subclass Options</h3>
          {/* Displaying the Subclass options for the chosen Class*/}
          {/* The dropdown menu's main button for the subclasses*/}
          { Boolean(subClassOptions !== undefined) & Boolean(chosenSubClassId == 0) ? (
            <div className="dropdown-wrapper">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button"
              onClick={() => {setSubClassDropdownOpen(!subClassDropdownOpen);}}
              id="plsbepink"
            >
              Select Subrace
            </button>
            
            {/* Dropdown Menu - Now positioned below the button, containing the subrace options and displaying them from the subRaceOptions array one by one */}
            { Boolean(subClassDropdownOpen) ? (
              <div className="dropdown-menu show">
                {subClassOptions.map( (subclass, id) =>(
                  <button
                    className="dropdown-item"
                    onClick={() => {setChosenSubClassId(subclass[1]);setSubClassDropdownOpen(false);setSubClassNames(subclass[0]);}}
                  >
                  {subclass[0]}
                  </button>
                  ))}
              </div>
            ):null}
          </div>):null}
          {/* Displaying the Selected Subrace's features*/}
          {Boolean(subClassFeatures !== undefined) & Boolean(chosenSubClassId !== 0) ? (
            subClassFeatures.map((feature, id)=>(
              <div className="selected-feature">
                <p><b>{feature.name}</b></p>
                <p><b>Description: </b>{feature.description}</p>
              </div>
            ))
          ): null}
            {/*Displaying the message in case a race has no subraces */}
          {Boolean(subClassOptions === undefined) & Boolean(subClassFeatures === undefined) ?(
            <p>No Subclasses available.</p>
          ): null}
        </>
    )
  }
return(
    <>
    <div className="creator-container">
      <h2 className="creator-title">Class</h2>
    </div>


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
    </>
)
}
export default ClassCard