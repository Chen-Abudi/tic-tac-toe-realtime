"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@client/hooks/useSocket";
import { Button } from "@tic-tac-toe/ui";

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const socketRef = useSocket();

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on("room_joined", (game) => {
      console.log("✅ Joined room successfully:", game);
      // TODO: store this in state later or navigate
    });

    socket.on("error", (errorMessage) => {
      console.error("❌ Socket error:", errorMessage);
    });

    return () => {
      socket.off("room_joined");
      socket.off("error");
    };
  }, [socketRef]);

  const handleCreateRoom = () => {
    if (socketRef.current && roomId) {
      socketRef.current.emit("create_room", roomId);

      console.log(`🆕 Creating room ${roomId}`);
    }
  };

  const handleJoinRoom = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (socketRef.current && roomId) {
      socketRef.current.emit("join_room", roomId);

      console.log(`🔗 Joining room ${roomId}`);
    }
  };

  // const handleSubmit = (evt: React.FormEvent) => {
  //   evt.preventDefault();

  //   if (!roomId || !socketRef.current) return;

  //   // socketRef.current.emit("join_room", roomId);
  //   socketRef.current.emit("create_room", roomId);

  //   console.log(`Joining room ${roomId}`); // Log for debugging
  // };

  return (
    <form onSubmit={handleJoinRoom} className="flex gap-2 justify-center mt-10">
      <input
        type="text"
        value={roomId}
        onChange={(evt) => setRoomId(evt.target.value)}
        className="border px-4 py-2 rounded"
        placeholder="Please Enter Room ID"
      />
      <div className="flex gap-4">
        <Button onClick={handleCreateRoom}>Create Room</Button>
        <Button
          type="submit"
          // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition"
        >
          Join Room
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
