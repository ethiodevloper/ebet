import React, { createContext, useContext, useState, useCallback } from "react";
import { BetSelection, BetSlipState } from "@/types/betting";

interface BetSlipContextType {
  state: BetSlipState;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (fixtureId: number) => void;
  clearSlip: () => void;
  setStake: (stake: number) => void;
  totalOdds: number;
  potentialPayout: number;
  isSelected: (fixtureId: number, label: string) => boolean;
}

const BetSlipContext = createContext<BetSlipContextType | null>(null);

export const useBetSlip = () => {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error("useBetSlip must be used within BetSlipProvider");
  return ctx;
};

export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BetSlipState>({ selections: [], stake: 100 });

  const addSelection = useCallback((selection: BetSelection) => {
    setState((prev) => {
      const filtered = prev.selections.filter((s) => s.fixtureId !== selection.fixtureId);
      return { ...prev, selections: [...filtered, selection] };
    });
  }, []);

  const removeSelection = useCallback((fixtureId: number) => {
    setState((prev) => ({
      ...prev,
      selections: prev.selections.filter((s) => s.fixtureId !== fixtureId),
    }));
  }, []);

  const clearSlip = useCallback(() => {
    setState((prev) => ({ ...prev, selections: [] }));
  }, []);

  const setStake = useCallback((stake: number) => {
    setState((prev) => ({ ...prev, stake }));
  }, []);

  const totalOdds = state.selections.reduce((acc, s) => acc * s.odds, 1);
  const potentialPayout = state.stake * totalOdds;

  const isSelected = useCallback(
    (fixtureId: number, label: string) =>
      state.selections.some((s) => s.fixtureId === fixtureId && s.label === label),
    [state.selections]
  );

  return (
    <BetSlipContext.Provider
      value={{ state, addSelection, removeSelection, clearSlip, setStake, totalOdds, potentialPayout, isSelected }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};
