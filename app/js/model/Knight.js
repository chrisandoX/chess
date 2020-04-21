import ChessPiece from "./ChessPiece";

export default class Knight extends ChessPiece {
  constructor(id, x, y, name, properties) {
    super(id, x, y, name, properties);
    this.className = "Knight";
  }
}
