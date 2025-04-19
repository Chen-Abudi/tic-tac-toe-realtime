import {
  createEmptyBoard,
  Player,
  Board,
  makeMove,
  checkWinner,
} from "shared/src/tictactoe";

type RoomId = string;

export interface GameState {
  board: Board;
  currentPlayer: Player;
  players: string[]; // socket IDs
  winner: Player | "draw" | null;
}

const rooms = new Map<RoomId, GameState>();

export function createRoom(roomId: string, socketId: string): GameState {
  const state: GameState = {
    board: createEmptyBoard(),
    currentPlayer: "X",
    players: [socketId],
    winner: null,
  };
  rooms.set(roomId, state);
  return state;
}

export function joinRoom(roomId: string, socketId: string): GameState | null {
  const room = rooms.get(roomId);
  if (!room || room.players.length >= 2) return null;
  room.players.push(socketId);
  return room;
}

export function makePlayerMove(
  roomId: string,
  socketId: string,
  row: number,
  col: number
): GameState | null {
  const game = rooms.get(roomId);
  if (!game || game.winner || game.players.length < 2) return null;

  const playerIndex = game.players.indexOf(socketId);
  if (playerIndex === -1) return null;

  const playerSymbol: Player = playerIndex === 0 ? "X" : "O";
  if (playerSymbol !== game.currentPlayer) return null;

  const newBoard = makeMove(game.board, row, col, playerSymbol);
  if (newBoard === game.board) return null;

  game.board = newBoard;
  game.winner = checkWinner(newBoard);

  if (
    !game.winner &&
    game.board.every((row) => row.every((cell) => cell !== null))
  ) {
    game.winner = "draw";
  }

  if (!game.winner) {
    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
  }

  return game;
}

export function resetGame(roomId: string): GameState | null {
  const game = rooms.get(roomId);
  if (!game) return null;

  game.board = createEmptyBoard();
  game.currentPlayer = "X";
  game.winner = null;

  return game;
}

// import {
//   createEmptyBoard,
//   Player,
//   Board,
//   makeMove,
//   checkWinner,
// } from "shared/src/tictactoe";

// type RoomId = string;

// export interface GameState {
//   board: Board;
//   currentPlayer: Player;
//   players: string[]; // The socket IDs
//   winner: Player | "draw" | null;
// }

// const rooms = new Map<RoomId, GameState>();

// export function createRoom(roomId: string, socketId: string): GameState {
//   const state: GameState = {
//     board: createEmptyBoard(),
//     currentPlayer: "X",
//     players: [socketId],
//     winner: null,
//   };
//   rooms.set(roomId, state);
//   return state;
// }

// export function joinRoom(roomId: string, socketId: string): GameState | null {
//   const room = rooms.get(roomId);
//   if (!room || room.players.length >= 2) return null;
//   room.players.push(socketId);

//   return room;
// }

// export function makePlayerMove(
//   roomId: string,
//   socketId: string,
//   row: number,
//   col: number
// ): GameState | null {
//   const game = rooms.get(roomId);

//   if (!game || game.winner || game.players.length < 2) return null;

//   const playerIndex = game.players.indexOf(socketId);
//   const playerSymbol = playerIndex === 0 ? "X" : "O";

//   if (playerSymbol !== game.currentPlayer) return null;

//   // Log the current game state before the move - For Debugging
//   console.log("Current Game State:", game);
//   console.log("Player Symbol:", playerSymbol);
//   console.log("Making move at position:", row, col);

//   const newBoard = makeMove(game.board, row, col, playerSymbol);

//   // Log the new board after the move - For Debugging
//   console.log("New Board after move:", newBoard);

//   if (newBoard === game.board) return null; // Move is invalid

//   game.board = newBoard;
//   game.winner = checkWinner(newBoard);

//   // Log the winner after the move - For Debugging
//   console.log("Winner after move:", game.winner);

//   // Check for a draw
//   if (
//     !game.winner &&
//     game.board.every((row) => row.every((cell) => cell !== null))
//   ) {
//     game.winner = "draw";
//     console.log("Game is a draw!");
//   }

//   if (!game.winner) {
//     game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
//     console.log("Next player:", game.currentPlayer);
//   }

//   return game;
// }

// export function getGameState(roomId: string): GameState | null {
//   return rooms.get(roomId) || null;
// }
