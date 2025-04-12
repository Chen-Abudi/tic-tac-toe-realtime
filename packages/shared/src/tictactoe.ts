export type Player = "X" | "O" | null;
export type Board = Player[][];

export function createEmptyBoard(): Board {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

export function checkWinner(board: Board): Player | "draw" | null {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // The Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }

  // Check for a draw
  const isFull = board.every((row) => row.every((cell) => cell !== null));
  return isFull ? "draw" : null;
}

export function isValidMove(board: Board, row: number, col: number): boolean {
  return board[row][col] === null;
}

export function makeMove(
  board: Board,
  row: number,
  col: number,
  player: Player
): Board {
  if (!isValidMove(board, row, col)) return board;

  const newBoard = board.map((row) => [...row]);
  newBoard[row][col] = player;
  return newBoard;
}
