import { create } from "zustand";

type GameState = {
  roomId: string;
  board: string[][];
  currentPlayer: string;
  gameOverMessage: string | null;
};

type GameStore = GameState & {
  setGameState: (state: GameState) => void;
  gameOverMessage: string | null;
  setGameOverState: (message: string | null) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  roomId: "",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: "",
  gameOverMessage: null,
  setGameState: (state) => set(() => ({ ...state })),
  setGameOverState: (message) => set(() => ({ gameOverMessage: message })),
  resetGame: () =>
    set(() => ({
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      currentPlayer: "",
      gameOverMessage: null,
    })),
}));
