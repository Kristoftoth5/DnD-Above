import React, { createContext, useState } from "react";

export const ClassIdContext = createContext();

export function ClassIdProvider({ children }) {
  const [selectedClassID, setSelectedClassId] = useState(5);

  return (
    <ClassIdContext.Provider value={{ selectedClassID, setSelectedClassId }}>
      {children}
    </ClassIdContext.Provider>
  );
}