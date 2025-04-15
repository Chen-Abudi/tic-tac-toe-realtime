const GameBoard = () => {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-10">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="aspect-square border border-gray-400 flex items-center justify-center text-2xl"
        >
          {/* Will show X / O later */}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
