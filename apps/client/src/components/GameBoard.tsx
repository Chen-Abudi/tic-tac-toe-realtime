// "use client";

// import { useEffect } from "react";
// import { useSocket } from "@client/hooks/useSocket";

// import { useGameStore } from "@client/store/game"; // Import Zustand store

// const GameBoard = () => {
//   // const socketRef = useSocket();
//   const { roomId, board, setBoard } = useGameStore();
//   const socketRef = useSocket();
//   // const [board, setBoardState] = useState(Array(9).fill(""));

//   const handleClick = (index: number) => {
//     if (!socketRef.current || board[index]) return;

//     socketRef.current.emit("make_move", {
//       roomId: roomId, // Use Zustand roomId here
//       playerId: socketRef.current.id, // Use Zustand playerId here
//       row: Math.floor(index / 3),
//       col: index % 3,
//     });

//     console.log("👤 My Socket ID:", socketRef.current?.id);
//   };

//   useEffect(() => {
//     if (!socketRef.current) return;

//     const socket = socketRef.current;

//     socket.on("game_update", (newBoard: string[][]) => {
//       // setBoardState(newBoard.flat());
//       setBoard(newBoard.flat()); // Update Zustand board state
//     });

//     socket.on("game_over", ({ winner }: { winner: string }) => {
//       alert(winner ? `Player ${winner} wins!` : "It's a draw!");
//     });

//     return () => {
//       socket.off("game_update");
//       socket.off("game_over");
//     };
//   }, [socketRef, setBoard]);

//   return (
//     <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-10">
//       {board.map((cell, i) => (
//         <div
//           key={i}
//           onClick={() => handleClick(i)}
//           className="aspect-square border border-gray-400 flex items-center justify-center text-2xl"
//         >
//           {cell}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GameBoard;

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
            {/* Will show X / O later */}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;

// My previous code - last commit
// "use client";

// import { useEffect, useState } from "react";
// import { useSocket } from "@client/hooks/useSocket";

// const GameBoard = () => {
//   const socketRef = useSocket();
//   const [board, setBoard] = useState(Array(9).fill(""));

//   const handleClick = (index: number) => {
//     if (!socketRef.current || board[index]) return;

//     socketRef.current.emit("make_move", {
//       roomId: "test-room", // Replace later with the actual room ID
//       playerId: socketRef.current.id,
//       row: Math.floor(index / 3),
//       col: index % 3,
//     });

//     console.log("👤 My Socket ID:", socketRef.current?.id);
//   };

//   useEffect(() => {
//     if (!socketRef.current) return;

//     const socket = socketRef.current;

//     socket.on("game_update", (newBoard: string[][]) => {
//       setBoard(newBoard.flat());
//     });

//     socket.on("game_over", ({ winner }: { winner: string }) => {
//       alert(winner ? `Player ${winner} wins!` : "It's a draw!");
//     });

//     return () => {
//       socket.off("game_update");
//       socket.off("game_over");
//     };
//   }, [socketRef]);

//   return (
//     <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-10">
//       {board.map((cell, i) => (
//         <div
//           key={i}
//           onClick={() => handleClick(i)}
//           className="aspect-square border border-gray-400 flex items-center justify-center text-2xl"
//         >
//           {cell}
//           {/* Will show X / O later */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GameBoard;
