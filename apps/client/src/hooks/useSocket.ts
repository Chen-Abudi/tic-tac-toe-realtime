import { useEffect } from "react";
import socket from "../libs/socket";

export const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("✅ Socket connected:", socket.id);
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("❌ Socket disconnected");
      }
    };
  }, []);

  return socket;
};

// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// export const useSocket = () => {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     const socket = io("http://localhost:4001");
//     socketRef.current = socket;

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return socketRef;
// };
