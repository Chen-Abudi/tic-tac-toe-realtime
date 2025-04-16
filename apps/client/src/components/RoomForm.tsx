"use client";

import { useState } from "react";
import { useSocket } from "@client/hooks/useSocket";

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const socketRef = useSocket();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!roomId || !socketRef.current) return;

    socketRef.current.emit("join_room", roomId);
    console.log("Joining room:", roomId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center mt-10">
      <input
        value={roomId}
        onChange={(evt) => setRoomId(evt.target.value)}
        className="border px-4 py-2 rounded"
        placeholder="Please Enter Room ID"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition"
      >
        Join
      </button>
    </form>
  );
};

export default RoomForm;
