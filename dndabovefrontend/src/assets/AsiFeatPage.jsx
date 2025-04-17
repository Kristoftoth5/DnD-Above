import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExtraFeatContext } from "./BringStatChoice.jsx";
import { StatsContext } from "./SaveContexts/StatContext.jsx";
import { FinalCharacterLevelContext } from "./SaveContexts/ClassContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import background1 from './bgImages/one.jpg';
import background2 from './bgImages/two.jpg';
import background3 from './bgImages/three.jpg';
import background4 from './bgImages/four.jpg';
import background5 from './bgImages/five.jpg';
import background6 from './bgImages/six.jpg';
import background7 from './bgImages/seven.jpg';
import background8 from './bgImages/eight.jpg';

const abilityNames = ["Strenght", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

function AsiFeatPage() {
  const { ExtraFeat } = useContext(ExtraFeatContext);
  const { Stats } = useContext(StatsContext);
  const { setStats } = useContext(StatsContext);
  const { FinalCharacterLevel } = useContext(FinalCharacterLevelContext);
  const navigate = useNavigate();

  const [baseStats, setBaseStats] = useState([]);
  const [modifiedStats, setModifiedStats] = useState([]);
  const [pointsRemaining, setPointsRemaining] = useState(0);

  const [randomBgImage, setRandomBgImage] = useState(Math.floor(Math.random() * 8));
  const images = [background1, background2, background3, background4, background5, background6, background7, background8];

  useEffect(() => {
    setBaseStats(Stats);
    setModifiedStats([...Stats]);

    let totalPoints = Math.floor(FinalCharacterLevel / 4) * 2;
    if (ExtraFeat) totalPoints += 2;
    setPointsRemaining(totalPoints);
  }, [Stats, FinalCharacterLevel, ExtraFeat]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomBgImage(Math.floor(Math.random() * 8));
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  const myStyle = {
    backgroundImage: `url(${images[randomBgImage]})`,
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const handleIncrease = (index) => {
    if (pointsRemaining <= 0 || modifiedStats[index] >= 20) return;
    setModifiedStats(prev => {
      const newStats = [...prev];
      newStats[index]++;
      return newStats;
    });
    setPointsRemaining(prev => prev - 1);
  };

  const handleDecrease = (index) => {
    if (modifiedStats[index] <= baseStats[index]) return;
    setModifiedStats(prev => {
      const newStats = [...prev];
      newStats[index]--;
      return newStats;
    });
    setPointsRemaining(prev => prev + 1);
  };

  const modCalc = (score) => Math.floor((score - 10) / 2);

  return (
    <div style={myStyle}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="creation-container p-4 rounded shadow-lg bg-light text-dark text-center">
          <h2 className="mb-4">Assign Ability Score Increases</h2>
          <p>Points Remaining: {pointsRemaining}</p>
          
          {/* Horizontal stat row */}
          <div className="d-flex justify-content-between gap-3 flex-wrap">
            {abilityNames.map((ability, index) => (
              <div key={ability} className="border rounded p-3 bg-white text-center" style={{ width: "140px" }}>
                <h5>{ability}</h5>
                <div className="fs-4">{modifiedStats[index]}</div>
                <div className="text-muted mb-2">Mod: {modCalc(modifiedStats[index])}</div>
                
                {/* Horizontal buttons */}
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleIncrease(index)}
                    disabled={pointsRemaining === 0 || modifiedStats[index] >= 20}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDecrease(index)}
                    disabled={modifiedStats[index] <= baseStats[index]}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Finalize Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {setStats(modifiedStats);navigate("/finalize")}}
              disabled={pointsRemaining !== 0}
            >
              Finalize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsiFeatPage;
