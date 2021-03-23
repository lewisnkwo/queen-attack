import QueenAttack, { Queens } from "./queen-attack";

describe("Queens", () => {
  it("initialized with specific placement", () => {
    const queens = new QueenAttack({ W: [3, 7], B: [6, 1] });
    expect(queens.white).toEqual([3, 7]);
    expect(queens.black).toEqual([6, 1]);
  });

  it("cannot occupy the same space", () => {
    const positioning: Queens = {
      W: [2, 4],
      B: [2, 4],
    };
    const expectedError = "Queens cannot share the same space";
    expect(() => new QueenAttack(positioning)).toThrow(expectedError);
  });

  it("toString representation", () => {
    const positioning: Queens = {
      W: [2, 4],
      B: [6, 6],
    };
    const queens = new QueenAttack(positioning);
    const board = [
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ W _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ B _",
      "_ _ _ _ _ _ _ _\n",
    ].join("\n");
    expect(queens.toString()).toEqual(board);
  });

  it("queens cannot attack", () => {
    const queens = new QueenAttack({ W: [2, 3], B: [4, 7] });
    expect(queens.canAttack()).toEqual(false);
  });

  it("queens can attack when they are on the same row", () => {
    const queens = new QueenAttack({ W: [2, 4], B: [2, 7] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack when they are on the same column", () => {
    const queens = new QueenAttack({ W: [5, 4], B: [2, 4] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack diagonally", () => {
    const queens = new QueenAttack({ W: [1, 1], B: [6, 6] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack another diagonally", () => {
    const queens = new QueenAttack({ W: [0, 6], B: [1, 7] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack yet another diagonally", () => {
    const queens = new QueenAttack({ W: [4, 1], B: [6, 3] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack on a north-east/south-west diagonal", () => {
    const queens = new QueenAttack({ W: [7, 0], B: [0, 7] });
    expect(queens.canAttack()).toEqual(true);
  });

  it("queens can attack on another ne/sw diagonal", () => {
    const queens = new QueenAttack({ W: [2, 6], B: [5, 3] });
    expect(queens.canAttack()).toEqual(true);
  });
});
