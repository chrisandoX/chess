import ChessPiece from "./ChessPiece";

export default class King extends ChessPiece {
  constructor(id, x, y, name, player) {
    super(id, x, y, name, player);
    this.className = "King";
    this.moves = [
      [[1, 0]],
      [[1, -1]],
      [[1, 1]],
      [[0, -1]],
      [[0, 1]],
      [[-1, -1]],
      [[-1, 0]],
      [[-1, 1]],
    ];
    this.attackMoves = this.moves;
  }
}
