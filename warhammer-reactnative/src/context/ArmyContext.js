import React, { createContext, useContext, useMemo, useState } from "react";

const ArmyContext = createContext();

export function ArmyProvider({ children }) {
  const [armyUnits, setArmyUnits] = useState([]);

  const addUnit = (unit) => {
    setArmyUnits((prev) => [...prev, unit]);
  };

  const removeUnit = (id) => {
    setArmyUnits((prev) => {
      const index = prev.findIndex((unit) => unit.id === id);
      if (index === -1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const totalPoints = useMemo(() => {
    return armyUnits.reduce((sum, unit) => sum + unit.points, 0);
  }, [armyUnits]);

  return (
    <ArmyContext.Provider
      value={{
        armyUnits,
        addUnit,
        removeUnit,
        totalPoints,
      }}>
      {children}
    </ArmyContext.Provider>
  );
}

export function useArmy() {
  const context = useContext(ArmyContext);
  if (!context) {
    throw new Error("useArmy must be used inside ArmyProvider");
  }
  return context;
}
