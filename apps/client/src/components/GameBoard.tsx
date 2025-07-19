"use client";

import { useState } from "react";
import { useGameStore } from "@client/store/game";
import { useSocket } from "@client/hooks/useSocket";
import { Button } from "@tic-tac-toe/ui";

const GameBoard = () => {
  const {
    board,
    roomId,
    gameOverMessage,
    currentPlayer,
    playerName,
    opponentName,
    playerSymbol,
    opponentSymbol,
  } = useGameStore((state) => state);

  const setGameOverMessage = useGameStore((state) => state.setGameOverState);
  const socket = useSocket();

  const [isWaitingForRematch, setIsWaitingForRematch] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (!roomId || gameOverMessage || board[row][col]) return;
    socket.emit("make_move", { roomId, row, col });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded mb-4 text-sm text-center">
        <p>
          <strong>{playerName}</strong> ({playerSymbol}) vs{" "}
          <strong>
            {opponentName ? opponentName : "Waiting for another player..."}
          </strong>
          ({opponentSymbol ? opponentSymbol : "?"})
        </p>
        <p className="mt-2">
          Current Turn:{" "}
          <span
            className={`font-bold ${
              currentPlayer === playerSymbol ? "text-blue-600" : "text-red-600"
            }`}
          >
            {currentPlayer}
          </span>
        </p>
      </div>

      {gameOverMessage && (
        <>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded mb-4 text-center">
            {gameOverMessage}
          </div>
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => {
                if (roomId) {
                  socket.emit("play_again", { roomId });
                  setGameOverMessage(null);
                  setIsWaitingForRematch(true);
                }
              }}
              disabled={isWaitingForRematch}
            >
              {isWaitingForRematch ? "Waiting for Opponent..." : "Play Again"}
            </Button>
          </div>
        </>
      )}

      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`aspect-square border border-gray-400 flex items-center justify-center text-2xl cursor-pointer ${
                board[rowIndex][colIndex]
                  ? "cursor-not-allowed bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
