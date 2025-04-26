"use client";

import { useState } from "react";
import { useGameStore } from "@client/store/game";
import RoomForm from "@client/components/RoomForm";
import GameBoard from "@client/components/GameBoard";
import { PlayerSetupModal } from "@client/components/modals/PlayerSetupModal";

export default function HomePage() {
  const { gameFlow, setGameState } = useGameStore();
  const [showModal, setShowModal] = useState(true);

  const handlePlayerVsPlayer = () => {
    setGameState({ gameFlow: "SELECT_MODE" });
  };

  const handleHelp = () => {
    alert("This will show a help guide soon! 🚀");
  };

  if (gameFlow === "HOME") {
    return (
      <main className="min-h-screen p-4 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to Tic Tac Toe 🎲</h1>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePlayerVsPlayer}
        >
          Play Against Player
        </button>
        <button
          className="px-6 py-3 bg-gray-400 text-white rounded cursor-not-allowed"
          disabled
        >
          Play Against CPU (Coming Soon)
        </button>
        <button
          className="px-6 py-3 bg-gray-400 text-white rounded cursor-not-allowed"
          disabled
        >
          View Available Rooms (Coming Soon)
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleHelp}
        >
          Help Guide
        </button>
      </main>
    );
  }

  if (gameFlow === "SELECT_MODE") {
    return (
      <main className="min-h-screen p-4 flex flex-col items-center justify-start">
        <RoomForm />
      </main>
    );
  }

  if (gameFlow === "SETUP_ROOM") {
    return (
      <>
        {showModal && (
          <PlayerSetupModal onConfirm={() => setShowModal(false)} />
        )}
        <main className="min-h-screen p-4 flex flex-col items-center justify-start">
          <GameBoard />
        </main>
      </>
    );
  }

  return null;
}

// "use client";

// import { useState } from "react";
// import RoomForm from "@client/components/RoomForm";
// import GameBoard from "@client/components/GameBoard";
// import { PlayerSetupModal } from "@client/components/modals/PlayerSetupModal";

// export default function HomePage() {
//   const [showModal, setShowModal] = useState(true);

//   return (
//     // <main className="min-h-screen p-4 flex flex-col items-center justify-start">
//     <main className="min-h-screen p-4">
//       <h1 className="text-4xl font-bold mt-8 flex justify-center">
//         Tic Tac Toe
//       </h1>
//       {showModal ? (
//         <PlayerSetupModal onConfirm={() => setShowModal(false)} />
//       ) : (
//         <>
//           <RoomForm />
//           <GameBoard />
//         </>
//       )}
//     </main>
//   );
// }
