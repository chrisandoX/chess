import ChessPiece from "./ChessPiece";

export default class Queen extends ChessPiece {
  constructor(id, x, y, z, name, properties) {
    super(id, x, y, z, name, properties);
    this.className = "Queen";
  }
}
