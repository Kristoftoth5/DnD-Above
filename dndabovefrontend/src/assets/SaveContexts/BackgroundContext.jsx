import React, { createContext, useState } from "react";

export const BgNameContext = createContext();

export const BgDescContext = createContext();

export const BgSkillsContext = createContext();

export const BgToolContext = createContext();

//Bg Name
export function BgNameProvider({ children }) {
  const [BgName, setBgName] = useState("");

  return (
    <BgNameContext.Provider value={{ BgName, setBgName }}>
      {children}
    </BgNameContext.Provider>
  );
}

//Bg Description
export function BgDescProvider({ children }) {
    const [BgDesc, setBgDesc] = useState("");

    return (
        <BgDescContext.Provider value={{ BgDesc, setBgDesc }}>
            {children}
        </BgDescContext.Provider>
    );
}

//Bg Skills
export function BgSkillsProvider({ children }) {
    const [BgSkills, setBgSkills] = useState(["Acrobatics","Animal Handling"]);
  
    return (
      <BgSkillsContext.Provider value={{ BgSkills, setBgSkills }}>
        {children}
      </BgSkillsContext.Provider>
    );
}

//Bg Tool
export function BgToolProvider({ children }) {
    const [BgTool, setBgTool] = useState("Aclhemist's Supplies");

    return (
        <BgToolContext.Provider value={{ BgTool, setBgTool }}>
            {children}
        </BgToolContext.Provider>
    );
}