import { create } from "zustand";

type GameState = {
  roomId: string;
  board: string[][];
  currentPlayer: string;
};

type GameStore = GameState & {
  setGameState: (state: GameState) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  roomId: "",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: "",
  setGameState: (state) => set(() => ({ ...state })),
}));
