import React, { createContext, useContext, useMemo, useState } from "react";
import type { ArmyUnit } from "../types";

type ArmyContextValue = {
  armyUnits: ArmyUnit[];
  addUnit: (unit: ArmyUnit) => void;
  removeUnit: (id: string) => void;
  totalPoints: number;
};

const ArmyContext = createContext<ArmyContextValue | null>(null);

export function ArmyProvider({ children }: { children: React.ReactNode }) {
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);

  const addUnit = (unit: ArmyUnit) => {
    setArmyUnits((prev) => [...prev, unit]);
  };

  const removeUnit = (id: string) => {
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
