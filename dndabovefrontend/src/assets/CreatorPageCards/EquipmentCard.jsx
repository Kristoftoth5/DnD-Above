import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import "../Cards.css"; // Reuse existing styles

function EquipmentCard({ startingGold }) {
  const [gold, setGold] = useState(startingGold);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState(false); // State to toggle visibility

  // Fetch all equipment data when the button is clicked
  const fetchEquipmentData = async () => {
    const equipmentData = await fetchEverything("Equipments");

    let formattedEquipment = [];
    equipmentData.forEach((item) => {
      let equipment = [
        item.name, // Equipment Name
        item.EquipmentType, // EquipmentType (Weapon, Armor, etc.)
        item.price, // Price
      ];
      formattedEquipment.push(equipment);
    });

    setEquipmentOptions(formattedEquipment);
  };

  // Buy equipment
  function buyEquipment(item) {
    if (gold >= item[2]) {
      setGold(gold - item[2]);
      setSelectedEquipment([...selectedEquipment, item]);
    }
  }

  // Remove selected equipment
  function removeEquipment(index) {
    let item = selectedEquipment[index];
    setGold(gold + item[2]);
    setSelectedEquipment(selectedEquipment.filter((_, i) => i !== index));
  }

  return (
    <div className="creator-container">
      <h2 className="creator-title">Equipment</h2>
      <h3 className="race-sub-title">Starting Gold: {gold} gp</h3>

      {/* Button to show equipment */}
      <button 
        className="btn btn-secondary"
        onClick={() => {
          setShowEquipment(!showEquipment); 
          if (!showEquipment) fetchEquipmentData();  // Fetch data only when showing
        }}
      >
        {showEquipment ? "Hide Equipment" : "Show Equipment"}
      </button>

      {/* Display equipment in a table */}
      {showEquipment && (
        <div className="equipment-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {equipmentOptions.length === 0 ? (
                <tr><td colSpan="4">No equipment available.</td></tr>
              ) : (
                equipmentOptions.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1] !== "" ? item[1] : "N/A"}</td> {/* Show N/A if EquipmentType is empty */}
                    <td>{item[2]} gp</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => buyEquipment(item)}
                        disabled={gold < item[2]}
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Equipment */}
      <div className="selected-multiple">
        <h3>Selected Equipment</h3>
        {selectedEquipment.map((item, index) => (
          <div key={index} className="selected-feature">
            <p>
              {item[0]} - {item[2]} gp
            </p>
            <button className="btn btn-danger" onClick={() => removeEquipment(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipmentCard;