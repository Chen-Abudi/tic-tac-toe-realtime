import { useState } from "react";
import { useGameStore } from "@client/store/game";

export const PlayerSetupModal = ({ onConfirm }: { onConfirm: () => void }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");
  const setGameState = useGameStore((state) => state.setGameState);

  const handleSubmit = () => {
    setGameState({
      playerName: name,
      playerSymbol: symbol,
      // opponentSymbol: symbol === "X" ? "O" : "X",
    });
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full space-y-4">
        <h2 className="text-lg font-semibold">Please Enter Your Name</h2>
        <input
          className="border w-full p-2 rounded"
          placeholder="Your name..."
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <div className="flex items-center gap-4">
          <span>Select your symbol:</span>
          <button
            className={`px-3 py-1 border rounded ${
              symbol === "X"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setSymbol("X")}
          >
            X
          </button>
          <button
            className={`px-3 py-1 border rounded ${
              symbol === "O" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setSymbol("O")}
          >
            O
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded w-full ${
            name.trim()
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          // className="bg-green-500 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
          disabled={!name.trim()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
