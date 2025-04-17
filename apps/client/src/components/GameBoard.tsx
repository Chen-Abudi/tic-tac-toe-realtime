"use client";

import { useEffect } from "react";
import { useGameStore } from "@client/store/game";
import { useSocket } from "@client/hooks/useSocket";

const GameBoard = () => {
  const { board, roomId } = useGameStore((state) => state);
  const updateGameState = useGameStore((state) => state.setGameState);
  const socket = useSocket();

  const handleCellClick = (row: number, col: number) => {
    console.log("Clicked cell:", row, col, "Room ID:", roomId); // debug
    if (!roomId) return;
    socket.emit("make_move", { roomId, row, col });
  };

  useEffect(() => {
    socket.on("game_update", (newState) => {
      updateGameState(newState);
    });

    return () => {
      socket.off("game_update");
    };
  }, [socket, updateGameState]);

  return (
    <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mt-8">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="aspect-square border border-gray-400 flex items-center justify-center text-2xl cursor-pointer"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
