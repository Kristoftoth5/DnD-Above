import React, { createContext, useState } from "react";

export const CreatorContext = createContext();

export const ExtraFeatContext = createContext();

//Stat choice
export function CreatorProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <CreatorContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </CreatorContext.Provider>
  );
}

//lvl 1 feat
export function ExtraFeatProvider({ children }) {
  const [ExtraFeat, setExtraFeat] = useState(false);

  return (
    <ExtraFeatContext.Provider value={{ ExtraFeat, setExtraFeat }}>
      {children}
    </ExtraFeatContext.Provider>
  );
}