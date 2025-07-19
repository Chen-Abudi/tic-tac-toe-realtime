"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@client/hooks/useSocket";
import { useGameStore } from "@client/store/game";
import { Button } from "@tic-tac-toe/ui";

type PlayersInfo = {
  roomId: string;
  players: { id: string; name: string; symbol: "X" | "O" }[];
  yourPlayerId: string;
  currentPlayerId: string;
};

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");

  const socket = useSocket();
  const setGameState = useGameStore((state) => state.setGameState);

  useEffect(() => {
    // TODO: Testing this solution
    const handlePlayersInfo = (data: PlayersInfo) => {
      if (!data.yourPlayerId) {
        console.error("❌ Missing yourPlayerId in players_info payload:", data);
        return;
      }

      const myPlayer = data.players.find((p) => p.id === data.yourPlayerId);
      const opponentPlayer = data.players.find(
        (p) => p.id !== data.yourPlayerId
      );

      if (!myPlayer || !opponentPlayer) {
        console.warn("⚠️ Incomplete player info received:", {
          players: data.players,
          yourPlayerId: data.yourPlayerId,
          myPlayer,
          opponentPlayer,
        });
        return;
      }

      console.log("✅ Received full player info:", {
        myPlayer,
        opponentPlayer,
        currentPlayerId: data.currentPlayerId,
      });

      setGameState({
        roomId: data.roomId,
        board: Array(3).fill(Array(3).fill(null)), // Reset board
        currentPlayer:
          data.currentPlayerId === myPlayer.id
            ? myPlayer.symbol
            : opponentPlayer.symbol,
        playerName: myPlayer.name,
        playerSymbol: myPlayer.symbol,
        opponentName: opponentPlayer.name,
        opponentSymbol: opponentPlayer.symbol,
        gameFlow: "IN_GAME",
      });
    };

    const handleError = (err: string) => {
      alert(err);
    };

    socket.on("players_info", handlePlayersInfo);
    socket.on("error", handleError);

    return () => {
      socket.off("players_info", handlePlayersInfo);
      socket.off("error", handleError);
    };
  }, [socket, setGameState]);

  const handleCreateOrJoinRoom = (type: "create" | "join") => {
    if (!roomId.trim() || !playerName.trim()) return;

    if (type === "create") {
      socket.emit("create_room", { roomId, playerName, symbol });
    } else {
      socket.emit("join_room", { roomId, playerName });
    }

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
