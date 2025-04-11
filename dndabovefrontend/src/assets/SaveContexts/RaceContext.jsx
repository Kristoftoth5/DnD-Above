import React, { createContext, useContext, useState } from "react";

export const RaceIdContext = createContext();

export const SubraceIdContext = createContext();

export const SubraceFeatureContext = createContext();

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


//Subrace Features
export function SubraceFeatureProvider({ children }) {
  const [SubraceFeature, setSubraceFeature] = useState();
  console.log("Subrace features "+SubraceFeature)

  return (
      <SubraceFeatureContext.Provider value={{ SubraceFeature, setSubraceFeature }}>
          {children}
      </SubraceFeatureContext.Provider>
  );
}