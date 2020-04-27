import ChessPiece from "./ChessPiece";

export default class Horse extends ChessPiece {
  constructor(id, x, y, name, player) {
    super(id, x, y, name, player);
    this.className = "Horse";
    this.moves = [
      [[2, -1]],
      [[2, 1]],
      [[-2, -1]],
      [[-2, 1]],
      [[1, -2]],
      [[1, 2]],
      [[-1, -2]],
      [[-1, 2]],
    ];
    this.attackMoves = this.moves;
  }
}
