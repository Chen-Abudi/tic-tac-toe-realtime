// import { useState, useEffect } from "react";
// import { useSocket } from "@client/hooks/useSocket";
// import { Button } from "@tic-tac-toe/ui";

// import { useGameStore } from "@client/store/game"; // Import Zustand store

// const RoomForm = () => {
//   const [roomId, setRoomId] = useState("");
//   const { setRoomId: setStoreRoomId } = useGameStore();
//   const socketRef = useSocket();

//   useEffect(() => {
//     const socket = socketRef.current;
//     if (!socket) return;

//     socket.on("room_joined", (game) => {
//       console.log("✅ Joined room successfully:", game);
//       setStoreRoomId(roomId); // Update Zustand state when room is joined - Remove comment later
//     });

//     socket.on("error", (errorMessage) => {
//       console.error("❌ Socket error:", errorMessage);
//     });

//     return () => {
//       socket.off("room_joined");
//       socket.off("error");
//     };
//   }, [socketRef, roomId, setStoreRoomId]);

//   const handleCreateRoom = () => {
//     if (socketRef.current && roomId) {
//       socketRef.current.emit("create_room", roomId);
//       console.log(`🆕 Creating room ${roomId}`);
//     }
//   };

//   const handleJoinRoom = (evt: React.FormEvent) => {
//     evt.preventDefault();

//     if (socketRef.current && roomId) {
//       socketRef.current.emit("join_room", roomId);
//       console.log(`🔗 Joining room ${roomId}`);
//     }
//   };

//   return (
//     <form onSubmit={handleJoinRoom} className="flex gap-2 justify-center mt-10">
//       <input
//         type="text"
//         value={roomId}
//         onChange={(evt) => setRoomId(evt.target.value)}
//         className="border px-4 py-2 rounded"
//         placeholder="Please Enter Room ID"
//       />
//       <div className="flex gap-4">
//         <Button onClick={handleCreateRoom}>Create Room</Button>
//         <Button type="submit">Join Room</Button>
//       </div>
//     </form>
//   );
// };

// export default RoomForm;

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

// "use client";

// import { useState, useEffect } from "react";
// import { useSocket } from "@client/hooks/useSocket";
// import { Button } from "@tic-tac-toe/ui";

// const RoomForm = () => {
//   const [roomId, setRoomId] = useState("");
//   const socketRef = useSocket();

//   useEffect(() => {
//     const socket = socketRef.current;
//     if (!socket) return;

//     socket.on("room_joined", (game) => {
//       console.log("✅ Joined room successfully:", game);
//       // TODO: store this in state later or navigate
//     });

//     socket.on("error", (errorMessage) => {
//       console.error("❌ Socket error:", errorMessage);
//     });

//     return () => {
//       socket.off("room_joined");
//       socket.off("error");
//     };
//   }, [socketRef]);

//   const handleCreateRoom = () => {
//     if (socketRef.current && roomId) {
//       socketRef.current.emit("create_room", roomId);

//       console.log(`🆕 Creating room ${roomId}`);
//     }
//   };

//   const handleJoinRoom = (evt: React.FormEvent) => {
//     evt.preventDefault();

//     if (socketRef.current && roomId) {
//       socketRef.current.emit("join_room", roomId);

//       console.log(`🔗 Joining room ${roomId}`);
//     }
//   };

//   return (
//     <form onSubmit={handleJoinRoom} className="flex gap-2 justify-center mt-10">
//       <input
//         type="text"
//         value={roomId}
//         onChange={(evt) => setRoomId(evt.target.value)}
//         className="border px-4 py-2 rounded"
//         placeholder="Please Enter Room ID"
//       />
//       <div className="flex gap-4">
//         <Button onClick={handleCreateRoom}>Create Room</Button>
//         <Button type="submit">Join Room</Button>
//       </div>
//     </form>
//   );
// };

// export default RoomForm;
