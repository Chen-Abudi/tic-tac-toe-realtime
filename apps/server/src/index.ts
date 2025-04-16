import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

import {
  createRoom,
  joinRoom,
  makePlayerMove,
  getGameState,
} from "./gameManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this in production
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4001;

app.use(cors());
app.get("/", (_: Request, res: Response) => {
  res.send("Tic Tac Toe Realtime Server is up 🚀");
});

const rooms = new Map<string, Set<string>>(); // Store socket IDs for room players

io.on("connection", (socket) => {
  console.log(`⚡️ New client connected: ${socket.id}`);

  socket.on("create_room", (roomId) => {
    console.log(`📦 Creating room ${roomId} by ${socket.id}`); // Log for debugging

    const game = createRoom(roomId, socket.id);
    rooms.set(roomId, new Set([socket.id])); // Store the socket ID in the room

    socket.join(roomId);
    socket.emit("room_joined", game);

    // Log the room ID after it's created for testing purposes
    console.log(`Room created with ID: ${roomId}`);
  });

  socket.on("join_room", (roomId) => {
    const game = joinRoom(roomId, socket.id);

    if (game) {
      rooms.get(roomId)?.add(socket.id); // Add the new player to the room
      socket.join(roomId);
      io.to(roomId).emit("room_joined", game);

      console.log(`Player ${socket.id} joined room ${roomId}`); // Log for debugging
    } else {
      socket.emit("error", "Oops, Room is full or doesn't exist");
    }
  });

  socket.on("make_move", ({ roomId, row, col }) => {
    console.log(`Player ${socket.id} is making a move at (${row}, ${col})`);

    const game = makePlayerMove(roomId, socket.id, row, col);

    if (game) {
      console.log("Game updated:", game);
      io.to(roomId).emit("game_update", game);
    } else {
      console.log(`Move failed for player ${socket.id}. Invalid move!`);
      socket.emit("error", "Uh oh, you just tried to make an invalid move!");
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    for (const [roomId, players] of rooms.entries()) {
      if (players.has(socket.id)) {
        players.delete(socket.id); // Remove the player from the room

        if (players.size === 0) {
          // If no players left, remove the room
          rooms.delete(roomId);
          console.log(`Room ${roomId} is now empty and deleted`); // Log for debugging
        } else {
          // Notify other players in the room that someone disconnected
          io.to(roomId).emit("player_disconnected", {
            message: `Player ${socket.id} disconnected.`,
          });
        }
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
