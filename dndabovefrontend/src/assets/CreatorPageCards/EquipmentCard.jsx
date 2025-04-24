import React, { useState, useEffect } from "react";
import fetchEverything from "../CommonFunctions/fetchEverything";
import "../Cards.css"; // Reuse existing styles
import { useContext } from "react";
import { EquipmentContext } from "../SaveContexts/EquipmentContext";
import { RemainingGoldContext } from "../SaveContexts/EquipmentContext";

function EquipmentCard({ classId }) {
  const [gold, setGold] = useState(0);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category


  const { setRemainingGold } = useContext(RemainingGoldContext);
  const { setEquipment } = useContext(EquipmentContext);

  // Fetch class gold
  useEffect(() => {
    async function fetchdatabyid() {
      const chosenClass = await fetchEverything("Classes/" + classId);
      setGold(chosenClass.startingGold + 15);
      setRemainingGold(chosenClass.startingGold + 15);
    }
    fetchdatabyid();
  }, [classId]);

  // Fetch all equipment data
  useEffect(() => {
    async function fetchEquipmentData() {
      const equipmentData = await fetchEverything("Equipments");
      let formattedEquipment = equipmentData.map((item) => [
        item.name, // Equipment Name
        item.equipmentType, // EquipmentType (Weapon, Armor, etc.)
        item.price, // Price
        item.id
      ]);
      setEquipmentOptions(formattedEquipment);
    }
    fetchEquipmentData();
  }, []);

  // Filter equipment by category
  const filteredEquipment = equipmentOptions.filter((item) => {
    if (selectedCategory === "Weapon") return item[1]?.endsWith("Weapon");
    if (selectedCategory === "Armor/Shield") return item[1]?.endsWith("Armor") || item[1]?.endsWith("Shield");
    if (selectedCategory === "Other") return !item[1] || item[1] === "";
    return false;
  });

  // Buy equipment
function buyEquipment(item) {
  if (gold >= item[2]) {
    const newSelected = [...selectedEquipment, item];
    setGold(gold - item[2]);
    setRemainingGold(gold - item[2]);
    setSelectedEquipment(newSelected);
    setEquipment(newSelected.map(e => e[3])); // Send only IDs
  }
}

// Remove selected equipment
function removeEquipment(index) {
  const updatedSelected = selectedEquipment.filter((_, i) => i !== index);
  const item = selectedEquipment[index];
  setGold(gold + item[2]);
  setRemainingGold(gold + item[2]);
  setSelectedEquipment(updatedSelected);
  setEquipment(updatedSelected.map(e => e[3])); // Send only IDs
}

  return (
    <div className="creator-container">
      <h2 className="creator-title">Equipment</h2>
      <h3 className="race-sub-title">Starting Gold: {classId != 0 ? gold + " gp" : "Choose a class first"}</h3>

      {/* Category selection buttons */}
      <div className="equipment-buttons">
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedCategory("Weapon")}
          id="plsbepink"
        >
          Weapons
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedCategory("Armor/Shield")}
          id="plsbepink"
        >
          Armor & Shields
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedCategory("Other")}
          id="plsbepink"
        >
          Other
        </button>
      </div>

      {/* Display filtered equipment in a table */}
      {selectedCategory && (
        <div className="equipment-table">
          <h3>{selectedCategory}</h3>
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
              {filteredEquipment.length === 0 ? (
                <tr><td colSpan="4">No equipment available.</td></tr>
              ) : (
                filteredEquipment.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1] || "Other"}</td>
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
            <p>{item[0]} - {item[2]} gp</p>
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