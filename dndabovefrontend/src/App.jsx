import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RoutingTest from './RoutingTest'
import fetchEverything from './assets/CommonFunctions/fetchEverything'
import modCalc from './assets/CommonFunctions/modCalc'
import profCalc from './assets/CommonFunctions/profCalc'
import diceToInteger from './assets/CommonFunctions/diceToInteger'

function App({message}) {
  const [count, setCount] = useState(0)

  const [STR, setSTR] = useState(1)
  const [DEX, setDEX] = useState(1)
  const [CON, setCON] = useState(1)
  const [INT, setINT] = useState(1)
  const [WIS, setWIS] = useState(1)
  const [CHA, setCHA] = useState(1)

  const [classId, setClassId] = useState(0)

  useEffect(()=>{
    console.log("Be van töltve az oldal, ye.")
    setClassId(2)
  }, [count])

  function getData() 
  {

    var str = document.getElementById("STR").value;
    if (str != STR) {
      setSTR(str);
    }
    
    var dex = document.getElementById("DEX").value;
    if (dex != DEX) {
      setDEX(dex);
    }
    
    var con = document.getElementById("CON").value;
    if (con != CON) {
      setCON(con);
    }
    
    var int = document.getElementById("INT").value;
    if (int != INT) {
      setINT(int);
    }
    
    var wis = document.getElementById("WIS").value;
    if (wis != WIS) {
      setWIS(wis);
    }
    
    var cha = document.getElementById("CHA").value;
    if (cha != CHA) {
      setCHA(cha);
    }
  }

  async function fetchproperties() {
    const data = await fetchEverything("Classes/6")

    console.log(typeof data)
    
    console.log(data);

        const place = document.getElementById('fighter');
        place.innerHTML = `
        Name: ${data.name} <br>
        Description: ${data.description} <br>
        Armor Proficiencies: ${data.armor_prof} <br>
        Spellcasting: ${data.spellCaster == 1 ? "Spellcaster" : "Not spellcaster"}
        `;
  }
  async function weaponBonus(weaponId)
  {
    const data = await fetchEverything("Classes/" + classId.toString())

    const weaponData = await fetchEverything("Equipments/" + weaponId.toString())

    const place = document.getElementById('weaponses');

    var weaponProperties = ["Finesse", "Light", "Thrown(20/60)"];

    var weaponPropertiesDisplayVariable = "";
    weaponProperties.forEach(This => {
      weaponPropertiesDisplayVariable += This + "; "
    })

    var AB = 0;
    var isFinesse = false;
    weaponProperties.forEach(Finesse => {
      if (Finesse == "Finesse")
      {
        isFinesse = true;
      }
    });

    var isVersatile = false;
    weaponProperties.forEach(Versatile => {
      if (Versatile == "Versatile")
      {
        isVersatile = true;
      }
    });

    if (isFinesse)
    {
      STR > DEX ? AB += STR : AB += DEX;
    }
    else
    {
      AB += STR;
    }
    var DamageB = AB;

    if (weaponData.profReq == 1)
    {
      data.weapon_prof.forEach(weapon => {
        weapon == "Daggers" ? AB += PB : AB += 0;
      });
    }

    

    

    place.innerHTML = `
      <p>${weaponData.name} | +${AB} | ${weaponData.damageDie} + ${DamageB} | ${weaponPropertiesDisplayVariable}</p>
    `;
    
    
  }


  async function hpCalculator(type)
  {
    const place = document.getElementById("hpCalcDesc");

    const data = await fetchEverything("Classes/2")

    var classLevel = 3;

    var maxHp = 0;

    var hitDie = data.hitDice;

    hitDie = diceToInteger(hitDie)

    var hitDieAverage = (hitDie / 2 ) + 1;

    if(type == 0)
    { 
      maxHp = hitDie + ((classLevel -1) * hitDieAverage) + (classLevel * modCalc(CON));
      place.innerHTML = `
      <p>Maximum Hitpoints</p>
      <p id="hpMax">${maxHp}</p>
      `;

    }

    if(type == 1)
      { 
        var rolledHp = 0;
        for (let i = 1; i <= classLevel-1; i++) 
        {
          rolledHp += Math.floor(Math.random()*hitDie)+1
          console.log(rolledHp);
        }
        
        maxHp = hitDie + (rolledHp) + (classLevel * modCalc(CON));
        place.innerHTML = `
        <p>Maximum Hitpoints</p>
        <p id="hpMax">${maxHp}</p>
        `;
  
      }

  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => console.log(message)}>
          
        </button>
        <button onClick={() => {console.log("Haláááál"); fetchproperties();}}>
          Show me the Fighter!
        </button>
        <button onClick={() => {console.log("Falmingo"); weaponBonus();}}>
          Show me the Dagger bonus!
        </button>
      </div>
      
      <div id="fighter">
        
      </div>
      <div id="Sorc_dagger">
        
      </div>

      <div id="stats">
        <form onChange={() => getData()}>
        <input type="number" name="" id="STR" min="1" />

        <input type="number" name="" id="DEX" min="1" />

        <input type="number" name="" id="CON" min="1" />

        <input type="number" name="" id="INT" min="1" />

        <input type="number" name="" id="WIS" min="1" />

        <input type="number" name="" id="CHA" min="1" />
        </form>
      </div>
      <div id="hpCalc">
      <input type="button" onClick={() => hpCalculator(0)} value="Average per level" />
      <input type="button" onClick={() => hpCalculator(1)} value="Roll per level" />
      </div>
      <div id="hpCalcDesc">

      </div>
      <div id="weaponses"> 
        <button className='dropbtn'>Wepaon</button>
        <div className='dropdown-content'>
          <input type="button" onClick={() => hpCalculator(0)} value="Daggers" />
          <input type="button" onClick={() => hpCalculator(0)} value="Longswords" />
        </div>
      </div>



      <RoutingTest message={message}/>
    </>
  )
}

export default App
