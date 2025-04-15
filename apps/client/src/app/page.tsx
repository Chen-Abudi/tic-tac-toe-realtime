import RoomForm from "@client/components/GameBoard";
import GameBoard from "@client/components/RoomForm";

export default function HomePage() {
  return (
    // <main className="min-h-screen p-4 flex flex-col items-center justify-start">
    <main className="min-h-screen p-4">
      <h1 className="text-4xl font-bold mt-8 flex justify-center">
        Tic Tac Toe
      </h1>
      <RoomForm />
      <GameBoard />
    </main>
  );
}
