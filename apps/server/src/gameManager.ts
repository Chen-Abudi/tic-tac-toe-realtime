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
//   players: string[]; // socket IDs
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
//   if (playerIndex === -1) return null;

//   const playerSymbol: Player = playerIndex === 0 ? "X" : "O";
//   if (playerSymbol !== game.currentPlayer) return null;

//   const newBoard = makeMove(game.board, row, col, playerSymbol);
//   if (newBoard === game.board) return null;

//   game.board = newBoard;
//   game.winner = checkWinner(newBoard);

//   if (
//     !game.winner &&
//     game.board.every((row) => row.every((cell) => cell !== null))
//   ) {
//     game.winner = "draw";
//   }

//   if (!game.winner) {
//     game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
//   }

//   return game;
// }

// export function resetGame(roomId: string): GameState | null {
//   const game = rooms.get(roomId);
//   if (!game) return null;

//   game.board = createEmptyBoard();
//   game.currentPlayer = "X";
//   game.winner = null;

//   return game;
// }

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
  players: { id: string; name: string; symbol: Player }[]; // store players with their names and symbols
  winner: Player | "draw" | null;
}

const rooms = new Map<RoomId, GameState>();

export function createRoom(
  roomId: string,
  socketId: string,
  playerName: string,
  symbol: Player
): GameState {
  const state: GameState = {
    board: createEmptyBoard(),
    currentPlayer: "X", // default start player
    players: [{ id: socketId, name: playerName, symbol }], // add player with name and symbol
    winner: null,
  };
  rooms.set(roomId, state);
  return state;
}

export function joinRoom(
  roomId: string,
  socketId: string,
  playerName: string
): GameState | null {
  const room = rooms.get(roomId);
  if (!room || room.players.length >= 2) return null;

  // assign symbol to the second player (if available)
  const symbol: Player = room.players.length === 1 ? "O" : "X";

  room.players.push({ id: socketId, name: playerName, symbol });
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

  const player = game.players.find((player) => player.id === socketId);
  if (!player) return null;

  if (player.symbol !== game.currentPlayer) return null;

  const newBoard = makeMove(game.board, row, col, player.symbol);
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
