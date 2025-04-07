import React, { createContext, useState } from "react";

export const StatsContext = createContext();

//Stats
export function StatsProvider({ children }) {
  const [Stats, setStats] = useState([]);

  return (
    <StatsContext.Provider value={{ Stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}