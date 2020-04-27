import ChessPiece from "./ChessPiece";

export default class Pawn extends ChessPiece {
  constructor(id, x, y, name, player) {
    super(id, x, y, name, player);
    this.className = "Pawn";

    if (player === "White") {
      this.moves = [[[0, -1]], [[0, -2]]];
      this.attackMoves = [[[-1, -1]], [[-1, 1]]];
    } else {
      this.moves = [[[0, 1]], [[0, 2]]];
      this.attackMoves = [[[1, -1]], [[1, 1]]];
    }
  }
}
