"use client";

import { useState } from "react";
import RoomForm from "@client/components/RoomForm";
import GameBoard from "@client/components/GameBoard";
import { PlayerSetupModal } from "@client/components/modals/PlayerSetupModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(true);

  return (
    // <main className="min-h-screen p-4 flex flex-col items-center justify-start">
    <main className="min-h-screen p-4">
      <h1 className="text-4xl font-bold mt-8 flex justify-center">
        Tic Tac Toe
      </h1>
      {showModal ? (
        <PlayerSetupModal onConfirm={() => setShowModal(false)} />
      ) : (
        <>
          <RoomForm />
          <GameBoard />
        </>
      )}
    </main>
  );
}
