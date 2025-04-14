import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log(`⚡️ New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
