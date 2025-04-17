import React, { createContext, useState } from "react";

export const FinalSpellsContext = createContext();

//Spells
export function FinalSpellsProvider({ children }) {
  const [FinalSpells, setFinalSpells] = useState([]);

  return (
    <FinalSpellsContext.Provider value={{ FinalSpells, setFinalSpells }}>
      {children}
    </FinalSpellsContext.Provider>
  );
}