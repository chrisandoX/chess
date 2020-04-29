import ChessPiece from "./ChessPiece";

export default class Tower extends ChessPiece {
  constructor(id, x, y, name, player) {
    super(id, x, y, name, player);
    this.className = "Tower";
    this.moves = [
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
      ],
      [
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [0, -5],
        [0, -6],
        [0, -7],
      ],
      [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
      ],
      [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
    ];
    this.attackMoves = this.moves;
  }
}
