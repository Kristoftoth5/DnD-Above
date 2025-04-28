import React, { createContext, useState } from "react";

export const RaceIdContext = createContext();

export const SubraceIdContext = createContext();

export const SubraceFeatureIdContext = createContext();

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

//Subrace features
export function SubraceFeatureIdProvider({ children }) {
  const [SubraceFeatureId, setSubraceFeatureId] = useState([]);

  return (
      <SubraceFeatureIdContext.Provider value={{ SubraceFeatureId, setSubraceFeatureId }}>
          {children}
      </SubraceFeatureIdContext.Provider>
  );
}