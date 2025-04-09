import React, { createContext, useState } from "react";

export const EquipmentContext = createContext();

export const RemainingGoldContext = createContext();

//Equipment
export function EquipmentProvider({ children }) {
  const [Equipment, setEquipment] = useState();

  return (
    <EquipmentContext.Provider value={{ Equipment, setEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
}


//Remaining Gold
export function RemainingGoldProvider({ children }) {
    const [RemainingGold, setRemainingGold] = useState(0);

    return (
        <RemainingGoldContext.Provider value={{ RemainingGold, setRemainingGold }}>
            {children}
        </RemainingGoldContext.Provider>
    );
}