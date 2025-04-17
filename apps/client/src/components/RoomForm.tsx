"use client";

import { useState } from "react";
import { useSocket } from "@client/hooks/useSocket";
import { useGameStore } from "@client/store/game";
import { Button } from "@tic-tac-toe/ui";

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const socket = useSocket();
  const setGameState = useGameStore((state) => state.setGameState);

  const handleCreateOrJoinRoom = (type: "create" | "join") => {
    if (!roomId.trim()) return;

    socket.emit(`${type}_room`, roomId);

    socket.on("room_joined", (gameState) => {
      setGameState({ ...gameState, roomId });
    });

    socket.on("error", (err) => {
      alert(err);
    });
  };

  return (
    <div className="flex gap-2 justify-center mt-10">
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room ID"
        className="border px-4 py-2 rounded"
      />
      <div className="flex space-x-2">
        <Button
          onClick={() => handleCreateOrJoinRoom("create")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Room
        </Button>
        <Button
          onClick={() => handleCreateOrJoinRoom("join")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default RoomForm;
