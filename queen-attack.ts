type BoardSquare = string | number;
type QueenColor = "W" | "B";

interface Queens<T> {
  white: T[];
  black: T[];
}

export default class QueenAttack<T extends BoardSquare> {
  public white: T[] = [];
  public black: T[] = [];
  public board: string = "";

  private defaultBoard: BoardSquare[][] = [
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
  ];

  constructor(queens: Queens<T>) {
    if (queens.white.toString() === queens.black.toString()) {
      throw new Error("Queens cannot share the same space");
    }
    this.white = queens.white;
    this.black = queens.black;

    const positionOne = this.positionQueen(this.white, "W", this.defaultBoard);
    const positionTwo = this.positionQueen(this.black, "B", positionOne);
    this.board = this.toBoardString(positionTwo).join("");
  }

  private positionQueen = (
    queen: T[],
    color: QueenColor,
    board: BoardSquare[][]
  ): BoardSquare[][] => {
    const row = queen[0] as number;
    const column = queen[1] as number;

    board[row].splice(column, 1, color);
    return board;
  };

  private toBoardString = (rows: BoardSquare[][]): string[] => {
    const toStringRow = (row: BoardSquare[]): string[] => {
      let stringRow: string[] = [];

      for (let i = 0; i < 8; i++) {
        stringRow = [...stringRow, ...row[i].toString()];
        if (i < 7) {
          stringRow = [...stringRow, " "];
        }
      }
      return stringRow;
    };

    let board: string[] = [];
    rows.forEach((val) => {
      board = [...board, ...`${toStringRow(val).join("")}${"\n"}`];
    });
    return board;
  };
}