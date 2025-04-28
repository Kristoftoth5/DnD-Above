import React, { createContext, useState } from "react";

export const StatsContext = createContext();

//Stats
export function StatsProvider({ children }) {
  const [Stats, setStats] = useState([8,8,8,8,8,8]);

  return (
    <StatsContext.Provider value={{ Stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}