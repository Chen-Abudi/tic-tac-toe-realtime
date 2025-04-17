// import { create } from "zustand";

// type GameState = {
//   roomId: string;
//   playerId: string;
//   board: string[];
//   setRoomId: (roomId: string) => void;
//   setPlayerId: (playerId: string) => void;
//   setBoard: (board: string[]) => void;
// };

// export const useGameStore = create<GameState>((set) => ({
//   roomId: "",
//   playerId: "",
//   board: Array(9).fill(""),
//   setRoomId: (roomId) => set({ roomId }),
//   setPlayerId: (playerId) => set({ playerId }),
//   setBoard: (board) => set({ board }),
// }));

// import { create } from "zustand";

// type GameState = {
//   roomId: string;
//   playerId: string;
//   board: string[];
//   setRoomId: (roomId: string) => void;
//   setPlayerId: (playerId: string) => void;
//   setBoard: (board: string[]) => void;
// };

// export const useGameStore = create<GameState>((set) => ({
//   roomId: "",
//   playerId: "",
//   board: Array(9).fill(""),
//   setRoomId: (roomId) => set({ roomId }),
//   setPlayerId: (playerId) => set({ playerId }),
//   setBoard: (board) => set({ board }),
// }));

// apps/client/src/store/game.ts
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
