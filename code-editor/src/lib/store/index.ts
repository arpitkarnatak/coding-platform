"use client"
import { create } from "zustand";

// Define the type for an individual store
type ProblemPageStore = {
  userCode: string;
  setUserCode: (code: string) => void;
  examplesResult: any[];
  setResults: (result: any[]) => void;
};

const useProblemPageStore = create<ProblemPageStore>((set) => ({
  userCode: "",
  setUserCode: (code: string) => set({ userCode: code }),
  examplesResult: [],
  setResults: (result: any[]) => set({ examplesResult: result }),
}));

export default useProblemPageStore;