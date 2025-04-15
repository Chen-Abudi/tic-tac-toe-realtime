import GameBoard from "./components/GameBoard";
import RoomForm from "./components/RoomForm";

export default function HomePage() {
  return (
    <main className="p-4">
      <RoomForm />
      <GameBoard />
    </main>
  );
}
