import { useEffect } from "react";
import socket from "@client/libs/socket";
import { useGameStore } from "@client/store/game";

export const useSocket = () => {
  const setGameState = useGameStore((state) => state.setGameState);
  const setGameOverState = useGameStore((state) => state.setGameOverState);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      // console.log("✅ Socket connected:", socket.id);
    }

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
    };

    socket.on("connect", onConnect);

    // Listen for game updates
    socket.on("game_update", (game) => {
      setGameState({
        board: game.board,
        currentPlayer: game.currentPlayer,
      });
    });

    // Listen for game over
    socket.on("game_over", ({ winner, draw }) => {
      const message = draw
        ? "🤝🏽 It's a draw!"
        : winner
        ? `🏆 Player ${winner} wins!`
        : null;

      setGameOverState(message);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("game_update");
      socket.off("game_over");
    };
  }, [setGameState, setGameOverState]);

  return socket;
};

// TODO: Might return or remove this
// import { useEffect } from "react";
// import socket from "@client/libs/socket";

// export const useSocket = () => {
//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//       console.log("✅ Socket connected:", socket.id);
//     }
//   }, []);

//   return socket;
// };

// TODO: Old code - might remove
// import { useEffect } from "react";
// import socket from "../libs/socket";

// export const useSocket = () => {
//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//       console.log("✅ Socket connected:", socket.id);
//     }

//     return () => {
//       if (socket.connected) {
//         socket.disconnect();
//         console.log("❌ Socket disconnected");
//       }
//     };
//   }, []);

//   return socket;
// };
