import React, { createContext, useState } from "react";

export const ClassIdContext = createContext();

export const SubclassIdContext = createContext();

export const BasicClassFeatureContext = createContext();

export const ChosenClassFeatureIdContext = createContext();

//Returns Class Id
export function ClassIdProvider({ children }) {
  const [ClassId, setClassId] = useState(0);

  return (
    <ClassIdContext.Provider value={{ ClassId, setClassId }}>
      {children}
    </ClassIdContext.Provider>
  );
}

//Returns Subclass Id
export function SubclassIdProvider({ children }) {
  const [SubclassId, setSubclassId] = useState(0);

  return (
    <SubclassIdContext.Provider value={{ SubclassId, setSubclassId }}>
      {children}
    </SubclassIdContext.Provider>
  );
}

//Returns the features coming with the class itself
export function BasicClassFeatureProvider({ children }) {
  const [BasicClassFeature, setBasicClassFeature] = useState([]);

  return (
    <BasicClassFeatureContext.Provider value={{ BasicClassFeature, setBasicClassFeature }}>
      {children}
    </BasicClassFeatureContext.Provider>
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