type BoardSquare = string | number;
type QueenColor = "W" | "B";

interface Queens<T> {
  white: T[];
  black: T[];
}

export default class QueenAttack<T extends BoardSquare> {
  public white: T[] = [];
  public black: T[] = [];
  public board: BoardSquare[][] = [];

  private defaultBoard: BoardSquare[][] = [...new Array(8)].map(() =>
    [...new Array(8)].map(() => "_")
  );

  constructor(queens: Queens<T>) {
    if (queens.white.toString() === queens.black.toString()) {
      throw new Error("Queens cannot share the same space");
    }
    this.white = queens.white;
    this.black = queens.black;

    const positionOne = this.positionQueen(this.white, "W", this.defaultBoard);
    this.board = this.positionQueen(this.black, "B", positionOne);
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

  public toString = (): string => {
    const toStringRow = (row: BoardSquare[]): string[] => {
      let stringRow: string[] = [];

      for (let i = 0; i < 8; i++) {
        stringRow = [...stringRow, row[i].toString()];
        if (i < 7) {
          stringRow = [...stringRow, " "];
        }
      }
      return stringRow;
    };

    let board: string[] = [];
    this.board.forEach((val) => {
      board = [...board, `${toStringRow(val).join("")}${"\n"}`];
    });
    return board.join("");
  };

  public canAttack = (): boolean => {
    const whiteQueenRow = this.white[0] as number;
    const whiteQueenColumn = this.white[1] as number;
    const blackQueenRow = this.black[0] as number;
    const blackQueenColumn = this.black[1] as number;

    const isSameRowOrColumn = (): boolean =>
      whiteQueenRow === blackQueenRow || whiteQueenColumn === blackQueenColumn;

    const canAttackDiagonally = (): boolean =>
      (whiteQueenRow === whiteQueenColumn &&
        blackQueenRow === blackQueenColumn) ||
      whiteQueenRow - blackQueenRow === whiteQueenColumn - blackQueenColumn ||
      whiteQueenRow - blackQueenRow === blackQueenColumn - whiteQueenColumn;

    if (isSameRowOrColumn() || canAttackDiagonally()) {
      return true;
    }
    return false;
  };
}
