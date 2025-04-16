"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@client/hooks/useSocket";

const GameBoard = () => {
  const socketRef = useSocket();
  const [board, setBoard] = useState(Array(9).fill(""));

  const handleClick = (index: number) => {
    if (!socketRef.current || board[index]) return;

    socketRef.current.emit("make_move", {
      roomId: "test-room", // Replace later with the actual room ID
      platerId: socketRef.current.id,
      row: Math.floor(index / 3),
      col: index % 3,
    });
  };

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.on("game_update", (newBoard: string[][]) => {
      setBoard(newBoard.flat());
    });

    socket.on("game_over", ({ winner }: { winner: string }) => {
      alert(winner ? `Player ${winner} wins!` : "It's a draw!");
    });

    return () => {
      socket.off("game_update");
      socket.off("game_over");
    };
  }, [socketRef]);

  return (
    <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-10">
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          className="aspect-square border border-gray-400 flex items-center justify-center text-2xl"
        >
          {cell}
          {/* Will show X / O later */}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
