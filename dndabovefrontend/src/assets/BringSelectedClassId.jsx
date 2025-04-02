import React, { createContext, useState } from "react";

export const ClassIdContext = createContext();

export function ClassIdProvider({ children }) {
  const [selectedClassId, setSelectedClassId] = useState(0);

  return (
    <ClassIdContext.Provider value={{ selectedClassId, setSelectedClassId }}>
      {children}
    </ClassIdContext.Provider>
  );
}