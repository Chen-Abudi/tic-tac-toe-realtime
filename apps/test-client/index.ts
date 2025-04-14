import { io } from "socket.io-client";

const socket = io("http://localhost:4001");

socket.on("connect", () => {
  console.log("✅ Connected as:", socket.id);

  socket.emit("create_room", "test-room");

  socket.on("room_joined", (state) => {
    console.log("🎮 Game state after joining:", state);

    // opt - Simulate move
    socket.emit("make_move", { roomId: "test-room", row: 0, col: 0 });
  });

  socket.on("game_update", (updateState) => {
    console.log("🌀 Game updated:", updateState);
  });

  socket.on("error", (err) => {
    console.error("❌ Oops, there's an error:", err);
  });
});
