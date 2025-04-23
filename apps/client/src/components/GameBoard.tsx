"use client";

import { useEffect } from "react";
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

  const updateGameState = useGameStore((state) => state.setGameState);
  const setGameOverMessage = useGameStore((state) => state.setGameOverState);
  const socket = useSocket();

  const handleCellClick = (row: number, col: number) => {
    if (!roomId || gameOverMessage) return;

    socket.emit("make_move", { roomId, row, col });
  };

  useEffect(() => {
    socket.on("game_update", (newState) => {
      updateGameState(newState);
    });

    socket.on("game_over", (data) => {
      if (data.draw) {
        setGameOverMessage("It's a draw!");
      } else {
        setGameOverMessage(`Player ${data.winner} wins!`);
      }
    });

    return () => {
      socket.off("game_update");
      socket.off("game_over");
    };
  }, [socket, updateGameState, setGameOverMessage]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded mb-4 text-sm text-center">
        <p>
          <strong>{playerName}</strong>({playerSymbol}) vs{""}
          <strong>{opponentName || "Waiting..."}</strong> (
          {opponentSymbol || "?"})
        </p>
        <p>
          Current Turn: <strong>{currentPlayer}</strong>
        </p>
      </div>

      {gameOverMessage && (
        <>
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-800 
          px-4 py-2 rounded mb-4 text-center"
          >
            {gameOverMessage}
          </div>
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => {
                if (roomId) {
                  socket.emit("play_again", { roomId });
                  setGameOverMessage(null);
                }
              }}
            >
              Play Again
            </Button>
          </div>
        </>
      )}

      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square border border-gray-400 flex items-center justify-center 
              text-2xl cursor-pointer"
              onClick={() => handleCellClick(rowIndex, colIndex)}
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
