import React, { createContext, useState } from "react";

export const CreatorContext = createContext();

export function CreatorProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <CreatorContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </CreatorContext.Provider>
  );
}