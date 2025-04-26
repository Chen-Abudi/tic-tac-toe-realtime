import { create } from "zustand";

type GameFlow = "HOME" | "SELECT_MODE" | "SETUP_ROOM" | "IN_GAME";

type GameState = {
  roomId: string;
  board: string[][];
  currentPlayer: string;
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
  currentPlayer: "",
  gameOverMessage: null,
  playerName: "",
  opponentName: "",
  playerSymbol: "",
  opponentSymbol: "",
  gameFlow: "HOME",
  setGameState: (state) => set((prev) => ({ ...prev, ...state })),
  setGameOverState: (message) => set(() => ({ gameOverMessage: message })),
  resetGame: () =>
    set((state) => ({
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      currentPlayer: "",
      gameOverMessage: null,
      roomId: state.roomId,
      playerName: state.playerName,
      opponentName: state.opponentName,
      playerSymbol: state.playerSymbol,
      opponentSymbol: state.opponentSymbol,
      gameFlow: "HOME",
    })),
}));

// import { create } from "zustand";

// type GameState = {
//   roomId: string;
//   board: string[][];
//   currentPlayer: string;
//   gameOverMessage: string | null;
//   playerName: string;
//   opponentName: string;
//   playerSymbol: "X" | "O" | "";
//   opponentSymbol: "X" | "O" | "";
// };

// type GameStore = GameState & {
//   setGameState: (state: Partial<GameState>) => void;
//   // gameOverMessage: string | null;
//   setGameOverState: (message: string | null) => void;
//   resetGame: () => void;
// };

// export const useGameStore = create<GameStore>((set) => ({
//   roomId: "",
//   board: [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""],
//   ],
//   currentPlayer: "",
//   gameOverMessage: null,
//   playerName: "",
//   opponentName: "",
//   playerSymbol: "",
//   opponentSymbol: "",
//   setGameState: (state) => set((prev) => ({ ...prev, ...state })),
//   setGameOverState: (message) => set(() => ({ gameOverMessage: message })),
//   resetGame: () =>
//     set((state) => ({
//       board: [
//         ["", "", ""],
//         ["", "", ""],
//         ["", "", ""],
//       ],
//       currentPlayer: "",
//       gameOverMessage: null,
//       roomId: state.roomId,
//       playerName: state.playerName,
//       opponentName: state.opponentName,
//       playerSymbol: state.playerSymbol,
//       opponentSymbol: state.opponentSymbol,
//     })),
// }));
