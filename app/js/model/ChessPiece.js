import Observable from "../Observable";

export default class ChessPiece extends Observable {
  constructor(id, x, y, name, player) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.player = player;
    this.selected = false;
  }
}
