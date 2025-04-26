"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@client/hooks/useSocket";
import { useGameStore } from "@client/store/game";
import { Button } from "@tic-tac-toe/ui";

type PlayersInfo = {
  players: { id: string; name: string; symbol: "X" | "O" }[];
  currentPlayerId: string;
};

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");

  const socket = useSocket();
  const setGameState = useGameStore((state) => state.setGameState);

  useEffect(() => {
    if (!socket) return;

    const handlePlayersInfo = (data: PlayersInfo) => {
      setGameState({ ...data, roomId });
    };

    const handleError = (err: string) => {
      alert(err);
    };

    socket.on("players_info", handlePlayersInfo);
    socket.on("error", handleError);

    // Cleanup: remove listeners when unmounting
    return () => {
      socket.off("players_info", handlePlayersInfo);
      socket.off("error", handleError);
    };
  }, [socket, setGameState, roomId]);

  const handleCreateOrJoinRoom = (type: "create" | "join") => {
    if (!roomId.trim() || !playerName.trim()) return;

    if (type === "create") {
      socket.emit("create_room", { roomId, playerName, symbol });
    } else {
      socket.emit("join_room", { roomId, playerName });
    }

    // Immediately update game state to show the 'setting up' status
    setGameState({ gameFlow: "SETUP_ROOM" });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <input
        className="border px-4 py-2 rounded w-64"
        type="text"
        value={playerName}
        onChange={(evt) => setPlayerName(evt.target.value)}
        placeholder="Please Enter Your Name"
      />
      <input
        className="border px-4 py-2 rounded w-64"
        type="text"
        value={roomId}
        onChange={(evt) => setRoomId(evt.target.value)}
        placeholder="Enter room ID"
      />

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Symbol:</label>
        <select
          className="px-4 py-2 rounded border"
          value={symbol}
          onChange={(evt) => setSymbol(evt.target.value as "X" | "O")}
        >
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </div>

      <div className="flex space-x-2 mt-4">
        <Button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleCreateOrJoinRoom("create")}
        >
          Create Room
        </Button>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleCreateOrJoinRoom("join")}
        >
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default RoomForm;

// "use client";

// import { useState } from "react";
// import { useSocket } from "@client/hooks/useSocket";
// import { useGameStore } from "@client/store/game";
// import { Button } from "@tic-tac-toe/ui";

// const RoomForm = () => {
//   const [roomId, setRoomId] = useState("");
//   const [playerName, setPlayerName] = useState("");
//   const [symbol, setSymbol] = useState<"X" | "O">("X");
//   const socket = useSocket();
//   const setGameState = useGameStore((state) => state.setGameState);

//   const handleCreateOrJoinRoom = (type: "create" | "join") => {
//     if (!roomId.trim() || !playerName.trim()) return;

//     if (type === "create") {
//       socket.emit("create_room", {
//         roomId,
//         playerName,
//         symbol,
//       });
//     } else {
//       socket.emit("join_room", {
//         roomId,
//         playerName,
//       });
//     }

//     setGameState({ gameFlow: "SETUP_ROOM" });

//     socket.on("players_info", (data) => {
//       setGameState({ ...data, roomId });
//     });

//     socket.on("error", (err) => {
//       alert(err);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 mt-10">
//       <input
//         type="text"
//         value={playerName}
//         onChange={(e) => setPlayerName(e.target.value)}
//         placeholder="Enter your name"
//         className="border px-4 py-2 rounded w-64"
//       />
//       <input
//         type="text"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         placeholder="Enter room ID"
//         className="border px-4 py-2 rounded w-64"
//       />

//       <div className="flex items-center gap-4">
//         <label className="text-sm font-medium">Symbol:</label>
//         <select
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value as "X" | "O")}
//           className="px-4 py-2 rounded border"
//         >
//           <option value="X">X</option>
//           <option value="O">O</option>
//         </select>
//       </div>

//       <div className="flex space-x-2 mt-4">
//         <Button
//           onClick={() => handleCreateOrJoinRoom("create")}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Create Room
//         </Button>
//         <Button
//           onClick={() => handleCreateOrJoinRoom("join")}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Join Room
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RoomForm;
