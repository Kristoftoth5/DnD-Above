import React, { createContext, useState } from "react";

export const RaceIdContext = createContext();

export const SubraceIdContext = createContext();

//Race Id
export function RaceIdProvider({ children }) {
  const [selectedRaceId, setSelectedRaceId] = useState(0);

  return (
    <RaceIdContext.Provider value={{ selectedRaceId, setSelectedRaceId }}>
      {children}
    </RaceIdContext.Provider>
  );
}


//Subrace Id
export function SubraceIdProvider({ children }) {
    const [selectedSubraceId, setSelectedSubraceId] = useState(0);

    return (
        <SubraceIdContext.Provider value={{ selectedSubraceId, setSelectedSubraceId }}>
            {children}
        </SubraceIdContext.Provider>
    );
}