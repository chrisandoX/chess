const Observable = require("../Observable");
const ChessPiece = require("./ChessPiece");

class Chessboard extends Observable {
  constructor(numCells, cellSize) {
    super();
    this.numCells = numCells;
    this.cellSize = cellSize;
    this.chessPieces = new Map();
    this.className = "Chessboard";
  }

  addChessPiece(chessPiece) {
    this.chessPieces.set("".concat(chessPiece.x, chessPiece.y), chessPiece);
    this.emit("ChessPieceAdded", { chessPiece });
  }

  moveChessPiece(chessPiece, cell) {
    this.removeChessPiece(chessPiece);
    chessPiece.x = cell[0];
    chessPiece.y = cell[1];
    this.addChessPiece(chessPiece);
    this.emit("ChessPieceMoved", { chessPiece });
  }

  removeChessPiece(chessPiece) {
    this.chessPieces.delete("".concat(chessPiece.x, chessPiece.y));
    this.emit("ChessPieceRemoved", { chessPiece });
  }

  getChessPieceByCellId(cellId) {
    return this.chessPieces.get(cellId);
  }

  getChessPieceByPosition(x, y) {
    for (const chessPiece of this.chessPieces.values()) {
      if (chessPiece.x === x && chessPiece.y === y) {
        return chessPiece;
      }
    }

    return null;
  }

  cellFromCellId(cellId) {
    return [cellId[0].charCodeAt(0) - 65, -parseInt(cellId[1]) + 8];
  }

  cellToCellId(cell) {
    return [String.fromCharCode(cell[0] + 65), String(8 - cell[1])];
  }
}

module.exports = Chessboard;
