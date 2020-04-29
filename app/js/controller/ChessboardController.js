import MainView from "../view/MainView";
import King from "../model/King";
import Queen from "../model/Queen";
import Tower from "../model/Tower";
import Knight from "../model/Knight";
import Pawn from "../model/Pawn";
import Horse from "../model/Horse";
import { generateUUID } from "../util";

export default class ChessboardController {
  constructor(chessboard, chessboardViewMediator) {
    this.chessboard = chessboard;
    this.chessboardViewMediator = chessboardViewMediator;
    this.view = new MainView(this, chessboard);
    this.view.initialize();
    this.legalMoves = new Map();
  }

  //   addVoxelPointer() {
  //     const voxelPointerCommand = new AddVoxelCommand(
  //       this.voxelGrid,
  //       generateUUID(),
  //       0,
  //       0,
  //       0,
  //       Voxel.Pointer,
  //       randomColor()
  //     );

  //     this.voxelGrid.voxelPointer = voxelPointerCommand.execute();
  //     this.voxelGridRemoteMediator.onCommandExecuted(voxelPointerCommand);
  //   }
  initialize_chessboard() {
    const chessPieces = [
      [["A", "2"], "Pawn", "White"],
      [["B", "2"], "Pawn", "White"],
      [["C", "2"], "Pawn", "White"],
      [["D", "2"], "Pawn", "White"],
      [["E", "2"], "Pawn", "White"],
      [["F", "2"], "Pawn", "White"],
      [["G", "2"], "Pawn", "White"],
      [["H", "2"], "Pawn", "White"],
      [["A", "1"], "Tower", "White"],
      [["H", "1"], "Tower", "White"],
      [["B", "1"], "Horse", "White"],
      [["G", "1"], "Horse", "White"],
      [["C", "1"], "Knight", "White"],
      [["F", "1"], "Knight", "White"],
      [["D", "1"], "Queen", "White"],
      [["E", "1"], "King", "White"],
      [["A", "7"], "Pawn", "Black"],
      [["B", "7"], "Pawn", "Black"],
      [["C", "7"], "Pawn", "Black"],
      [["D", "7"], "Pawn", "Black"],
      [["E", "7"], "Pawn", "Black"],
      [["F", "7"], "Pawn", "Black"],
      [["G", "7"], "Pawn", "Black"],
      [["H", "7"], "Pawn", "Black"],
      [["A", "8"], "Tower", "Black"],
      [["H", "8"], "Tower", "Black"],
      [["B", "8"], "Horse", "Black"],
      [["G", "8"], "Horse", "Black"],
      [["C", "8"], "Knight", "Black"],
      [["F", "8"], "Knight", "Black"],
      [["D", "8"], "Queen", "Black"],
      [["E", "8"], "King", "Black"],
    ];
    chessPieces.forEach((e) => {
      this.chessboard.addChessPiece(this.createChessPiece(...e));
    });
  }

  onCellHover(cell) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected() && this.legalMoves.has("".concat(...chessCellId))) {
      // if this cell is already occupied it must be the oponents piece
      // so we need to delete it.
      if (chessPiece !== undefined && chessPiece !== this.selectedChessPiece) {
        this.chessboard.removeChessPiece(chessPiece);
        this.chessboard.moveChessPiece(this.selectedChessPiece, chessCellId);
        this.deselectChessPiece(this.selectedChessPiece);
        return;
      }
      this.chessboard.moveChessPiece(this.selectedChessPiece, chessCellId);
    }

    // this.executeCommand(
    //   new MoveVoxelCommand(
    //     this.voxelGrid,
    //     this.voxelGrid.voxelPointer,
    //     cell[0],
    //     cell[1],
    //     cell[2]
    //   )
    // );
  }

  createChessPiece(chessCellId, name, player) {
    switch (name) {
      case "Knight":
        return new Knight(generateUUID(), ...chessCellId, name, player);
      case "King":
        return new King(generateUUID(), ...chessCellId, name, player);
      case "Queen":
        return new Queen(generateUUID(), ...chessCellId, name, player);
      case "Pawn":
        return new Pawn(generateUUID(), ...chessCellId, name, player);
      case "Tower":
        return new Tower(generateUUID(), ...chessCellId, name, player);
      case "Horse":
        return new Horse(generateUUID(), ...chessCellId, name, player);
    }
    //Throw error chess piece type not recognized
    console.log("ERRROR NOT RECOGNIZED CHESS PIECE TYPE");
    return;
  }

  onCellClicked(cell) {
    const chessCellId = this.chessboard.cellToCellId(cell);
    const chessPiece = this.chessboard.getChessPieceByCellId(chessCellId);

    if (this.isSelected()) {
      this.deselectChessPiece(chessPiece);
    } else {
      this.selectChessPiece(chessPiece);
    }
  }

  selectChessPiece(chessPiece) {
    if (chessPiece && !this.selectedChessPiece) {
      this.selectedChessPiece = chessPiece;
      this.legalMoves = this.getLegalMovements(this.chessboard, chessPiece);
      this.chessboard.selectChessPiece(chessPiece, this.legalMoves);
    }
  }

  isSelected() {
    if (this.selectedChessPiece) {
      return true;
    }
    return false;
  }

  deselectChessPiece(chessPiece) {
    if (chessPiece && chessPiece.selected) {
      this.chessboard.deselectChessPiece(chessPiece, this.legalMoves);
      this.selectedChessPiece = false;
    }
  }

  getLegalMovements(chessboard, chessPiece) {
    const startPosition = this.chessboard.cellFromCellId([
      chessPiece.x,
      chessPiece.y,
    ]);

    let checkMoves;
    if (
      (chessPiece.name === "Pawn" &&
        chessPiece.player === "White" &&
        chessPiece.y != "2") ||
      (chessPiece.name === "Pawn" &&
        chessPiece.player === "Black" &&
        chessPiece.y != "7")
    ) {
      checkMoves = Object.assign([], [chessPiece.moves[0]]);
    } else {
      checkMoves = Object.assign([], chessPiece.moves);
    }

    let nextMove = [0, 0];
    const legalMovements = new Map();

    // current position is also legal TODO decide if onece the chessPiece is pressed it must be moved.
    // In real rules, you can't touch the chessPiece and change your mind and not move it.?
    legalMovements.set("".concat(chessPiece.x, chessPiece.y), 1);

    while (checkMoves.length > 0) {
      let moveTo = checkMoves.pop();
      for (let i = 0; i < moveTo.length; i++) {
        nextMove[0] = moveTo[i][0] + startPosition[0];
        nextMove[1] = moveTo[i][1] + startPosition[1];
        let cellId = this.chessboard.cellToCellId(nextMove);
        // Out of chessboard bounds
        if (
          nextMove[0] > 7 ||
          nextMove[0] < 0 ||
          nextMove[1] > 7 ||
          nextMove[1] < 0
        ) {
          break;
        }

        // Already occupied cell
        if (this.chessboard.chessPieces.has("".concat(...cellId))) {
          // get what piece does occupy this cell
          const occupiedChessPiece = this.chessboard.getChessPieceByCellId(
            cellId
          );
          if (chessPiece.player !== occupiedChessPiece.player) {
            // The occupied cell is the oponents cell, so we can attack.
            legalMovements.set("".concat(...cellId), 1);
          }
          break;
        }

        legalMovements.set("".concat(...cellId), 1);
      }
    }
    return legalMovements;
  }
  // this.executeCommand(
  //   new AddVoxelCommand(
  //     this.voxelGrid,
  //     generateUUID(),
  //     cell[0],
  //     cell[1],
  //     cell[2],
  //     parseInt(uiSettings.type)
  //   )
  // );

  //   executeCommand(command) {
  //     command.execute(command);
  //     this.voxelGridRemoteMediator.onCommandExecuted(command);
  //   }
}
