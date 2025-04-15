import React, { createContext, useState } from "react";

export const ClassIdContext = createContext();

export const SubclassIdContext = createContext();

export const BasicClassFeatureIdContext = createContext();

export const ChosenClassFeatureIdContext = createContext();

export const FinalCharacterLevelContext = createContext();

export const CasterContext = createContext();

export const HalfcasterContext = createContext();

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

//Returns Chosen features' Ids (Invocations, Metamagic, Fightning styles)
export function ChosenClassFeatureIdProvider({ children }) {
  const [ChosenClassFeatureId, setChosenClassFeatureId] = useState([]);

  return (
    <ChosenClassFeatureIdContext.Provider value={{ ChosenClassFeatureId, setChosenClassFeatureId }}>
      {children}
    </ChosenClassFeatureIdContext.Provider>
  );
}

//Returns the basic features of the selected class
export function BasicClassFeatureIdProvider({ children }) {
  const [BasicClassFeatureId, setBasicClassFeatureId] = useState([]);

  return (
    <BasicClassFeatureIdContext.Provider value={{ BasicClassFeatureId, setBasicClassFeatureId }}>
      {children}
    </BasicClassFeatureIdContext.Provider>
  );
}

//Returns the level of the character
export function FinalCharacterLevelProvider({ children }) {
  const [FinalCharacterLevel, setFinalCharacterLevel] = useState(6);
  console.log("Level: "+FinalCharacterLevel)
  return (
    <FinalCharacterLevelContext.Provider value={{ FinalCharacterLevel, setFinalCharacterLevel }}>
      {children}
    </FinalCharacterLevelContext.Provider>
  );
}

//Returns if the character is a caster
export function CasterProvider({ children }) {
  const [Caster, setCaster] = useState(1);
  console.log("Caster: "+Caster)
  return (
    <CasterContext.Provider value={{ Caster, setCaster }}>
      {children}
    </CasterContext.Provider>
  );
}

//Returns if the character is a halfcaster
export function HalfcasterProvider({ children }) {
  const [Halfcaster, setHalfcaster] = useState(0);
  console.log("Halfcaster: " + Halfcaster)
  return (
    <HalfcasterContext.Provider value={{ Halfcaster, setHalfcaster }}>
      {children}
    </HalfcasterContext.Provider>
  );
}