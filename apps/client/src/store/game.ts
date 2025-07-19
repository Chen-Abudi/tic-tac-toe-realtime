import { create } from "zustand";

type GameFlow = "HOME" | "SELECT_MODE" | "SETUP_ROOM" | "IN_GAME";

type GameState = {
  roomId: string;
  board: string[][];
  currentPlayer: "X" | "O";
  gameOverMessage: string | null;
  playerName: string;
  opponentName: string;
  playerSymbol: "X" | "O" | "";
  opponentSymbol: "X" | "O" | "";
  gameFlow: GameFlow;
};

type GameStore = GameState & {
  setGameState: (state: Partial<GameState>) => void;
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
  currentPlayer: "X", // defaulting to 'X' ensures that this field is never undefined
  gameOverMessage: null,
  playerName: "",
  opponentName: "",
  playerSymbol: "",
  opponentSymbol: "",
  gameFlow: "HOME",
  setGameState: (state) =>
    set((prev) => ({
      ...prev,
      ...state,
      currentPlayer: state.currentPlayer ?? prev.currentPlayer, // Ensures that currentPlayer is not overwritten by undefined
      playerSymbol: state.playerSymbol ?? prev.playerSymbol, // Same for playerSymbol
      opponentSymbol: state.opponentSymbol ?? prev.opponentSymbol, // Same for opponentSymbol
    })),
  setGameOverState: (message) => set(() => ({ gameOverMessage: message })),
  resetGame: () =>
    set((state) => ({
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      currentPlayer: "X", // resetting the current player to 'X' as default
      gameOverMessage: null,
      roomId: state.roomId,
      playerName: state.playerName,
      opponentName: state.opponentName,
      playerSymbol: state.playerSymbol,
      opponentSymbol: state.opponentSymbol,
      gameFlow: "HOME",
    })),
}));
