import React, { createContext, useState } from "react";

export const UserIdContext = createContext();

//Stats
export function UserIdProvider({ children }) {
  const [UserId, setUserId] = useState(0);

  return (
    <UserIdContext.Provider value={{ UserId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}