import React, { createContext, useState } from "react";

export const UserIdContext = createContext();

//Stats
export function UserIdProvider({ children }) {
  const [UserId, setUserId] = useState(() => localStorage.getItem("UserId") || null);

  return (
    <UserIdContext.Provider value={{ UserId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}