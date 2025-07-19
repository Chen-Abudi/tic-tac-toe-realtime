import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

import {
  createRoom,
  joinRoom,
  makePlayerMove,
  GameState,
  resetGame,
} from "./gameManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // TODO: Adjust this in production
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4001;

app.use(cors());
app.get("/", (_: Request, res: Response) => {
  res.send("Tic Tac Toe Realtime Server is up 🚀");
});

const rooms = new Map<string, GameState>();

io.on("connection", (socket) => {
  console.log(`⚡️ New client connected: ${socket.id}`);

  socket.on("create_room", ({ roomId, playerName, symbol }) => {
    const game = createRoom(roomId, socket.id, playerName, symbol);
    rooms.set(roomId, game);

    socket.join(roomId);
    socket.emit("room_joined", game);

    console.log(`📦 Room created with ID: ${roomId}`);
    console.log(`🎮 Player ${socket.id} created and joined room ${roomId}`);
  });

  socket.on("join_room", ({ roomId, playerName }) => {
    const game = joinRoom(roomId, socket.id, playerName);

    if (game) {
      rooms.set(roomId, game);
      socket.join(roomId);

      console.log(
        ` [DEBUG] Emitting players_info for room ${roomId}:`,
        game.players
      );

      // For each player individually
      game.players.forEach((player) => {
        io.to(player.id).emit("players_info", {
          roomId,
          players: game.players,
          yourPlayerId: player.id,
          currentPlayerId: game.currentPlayer,
        });
      });

      console.log(`🎮 Player ${socket.id} joined room ${roomId}`);
    } else {
      socket.emit("error", "Oops, Room is full or doesn't exist");
    }
  });

  socket.on("make_move", ({ roomId, row, col }) => {
    // Log the move attempt
    console.log(
      `🟢 Player ${socket.id} is attempting a move in room ${roomId}: (${row}, ${col})`
    );

    const game = makePlayerMove(roomId, socket.id, row, col);

    if (game) {
      // Log the updated board and current player
      console.log(
        `🧩 Updated board in room ${roomId} after player ${socket.id}'s move:`
      );
      console.log(game.board.slice(0, 3).join(" | "));
      console.log(game.board.slice(3, 6).join(" | "));
      console.log(game.board.slice(6, 9).join(" | "));
      console.log(`🎮 Next turn: Player ${game.currentPlayer}`);

      io.to(roomId).emit("game_update", game);

      if (game.winner) {
        // Log the winner or if the game ended in a draw
        if (game.winner === "draw") {
          console.log(`🤝🏽 The game in room ${roomId} ended in a draw.`);
        } else {
          console.log(
            `🏆 The winner of the game in room ${roomId} is Player ${game.winner}!`
          );
        }

        io.to(roomId).emit("game_over", {
          winner: game.winner === "draw" ? null : game.winner,
          draw: game.winner === "draw",
        });
      }
    } else {
      // Log if the move was invalid
      console.log(`🚫 Invalid move by player ${socket.id} in room ${roomId}`);

      socket.emit("error", "Invalid move!");
    }
  });

  socket.on("play_again", ({ roomId }) => {
    const updatedGame = resetGame(roomId);
    if (updatedGame) {
      io.to(roomId).emit("game_update", updatedGame);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    for (const [roomId, game] of rooms.entries()) {
      if (game.players.some((player) => player.id === socket.id)) {
        game.players = game.players.filter((player) => player.id !== socket.id);

        if (game.players.length === 0) {
          rooms.delete(roomId);
          console.log(`🗑 Room ${roomId} deleted`);
        } else {
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
