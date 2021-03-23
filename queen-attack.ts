type QueenColor = "W" | "B";
type BoardSquare = QueenColor | "_";
type Coordinate = [Position, Position];
type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// export interface Queens {
//   white: Coordinate;
//   black: Coordinate;
// }

export type Queens = Record<QueenColor, Coordinate>;

export default class QueenAttack {
  public white: Queens["W"];
  public black: Queens["B"];
  public board: BoardSquare[][] = [];

  private defaultBoard: BoardSquare[][] = [...new Array(8)].map(() =>
    [...new Array(8)].map(() => "_")
  );

  constructor(queens: Queens) {
    if (queens.W.toString() === queens.B.toString()) {
      throw new Error("Queens cannot share the same space");
    }
    this.white = queens.W;
    this.black = queens.B;

    const positionOne = this.positionQueen(this.white, "W", this.defaultBoard);
    this.board = this.positionQueen(this.black, "B", positionOne);
  }

  private positionQueen = (
    queen: Coordinate,
    color: QueenColor,
    board: BoardSquare[][]
  ): BoardSquare[][] => {
    const row = queen[0];
    const column = queen[1];

    board[row].splice(column, 1, color);
    return board;
  };

  public toString = (): string => {
    let board: string[] = [];
    this.board.forEach((val) => {
      // use forEach for side effects (e.g. printing logs), use map/reduce instead
      board = [...board, `${val.join(" ")}${"\n"}`];
    });
    return board.join("");
  };

  public canAttack = (): boolean => {
    const [whiteQueenRow, whiteQueenColumn] = this.white;
    const blackQueenRow = this.black[0];
    const blackQueenColumn = this.black[1];

    const isSameRowOrColumn = (): boolean =>
      whiteQueenRow === blackQueenRow || whiteQueenColumn === blackQueenColumn;

    const canAttackDiagonally = (): boolean =>
      (whiteQueenRow === whiteQueenColumn &&
        blackQueenRow === blackQueenColumn) ||
      whiteQueenRow - blackQueenRow === whiteQueenColumn - blackQueenColumn ||
      whiteQueenRow - blackQueenRow === blackQueenColumn - whiteQueenColumn;

    return isSameRowOrColumn() || canAttackDiagonally();
  };
}
