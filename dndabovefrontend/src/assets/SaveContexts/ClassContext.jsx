import React, { createContext, useState } from "react";

export const ClassIdContext = createContext();

export const SubclassIdContext = createContext();

export const ChosenClassFeatureIdContext = createContext();

//Returns Class Id
export function ClassIdProvider({ children }) {
  const [selectedClassId, setSelectedClassId] = useState(0);

  return (
    <ClassIdContext.Provider value={{ selectedClassId, setSelectedClassId }}>
      {children}
    </ClassIdContext.Provider>
  );
}

//Returns Subclass Id
export function SubclassIdProvider({ children }) {
  const [selectedSubclassId, setSelectedSubclassId] = useState(0);

  return (
    <SubclassIdContext.Provider value={{ selectedSubclassId, setSelectedSubclassId }}>
      {children}
    </SubclassIdContext.Provider>
  );
}

//Returns Chosen features' Ids (Invocations, Metamagic, Fightning styles)
export function ChosenClassFeatureIdProvider({ children }) {
  const [ChosenClassFeatureId, setChosenClassFeatureId] = useState([]);

  return (
    <ChosenClassFeatureIdContext.Provider value={{ ChosenClassFeatureId, setChosenClassFeatureId }}>
      {children}
    </ChosenClassFeatureIdContext.Provider>
  );
}