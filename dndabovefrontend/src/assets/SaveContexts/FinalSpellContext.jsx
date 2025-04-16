import React, { createContext, useState } from "react";

export const FinalSpellsContext = createContext();

//Spells
export function FinalSpellsProvider({ children }) {
  const [FinalSpells, setFinalSpells] = useState([]);
  console.log("Spells you have chosen: "+FinalSpells)
  return (
    <FinalSpellsContext.Provider value={{ FinalSpells, setFinalSpells }}>
      {children}
    </FinalSpellsContext.Provider>
  );
}