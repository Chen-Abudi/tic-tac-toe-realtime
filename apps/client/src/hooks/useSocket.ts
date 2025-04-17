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
