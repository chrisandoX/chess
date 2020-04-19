import ViewMediator from "./ViewMediator";
import PawnViewMediator from "./PawnViewMediator";
import KingViewMediator from "./KingViewMediator";
import TowerViewMediator from "./TowerViewMediator";
import HorseViewMediator from "./HorseViewMediator";
import QueenViewMediator from "./QueenViewMediator";
import KnightViewMediator from "./KnightViewMediator";
import Pawn from "../../model/Pawn";

export default class ChessboardViewMediator extends ViewMediator {
  constructor(chessboard) {
    super(chessboard);
    chessboard.addObserver("ChessPieceAdded", (e) => this.onChessPieceAdded(e));
    chessboard.addObserver("ChessPieceRemoved", (e) =>
      this.onChessPieceRemoved(e)
    );
    chessboard.addObserver("ChessPieceMoved", (e) => this.onChessPieceMoved(e));

    const grid = this.getGridObject(chessboard);

    this.object3D.add(grid);
    this.objects = [];

    this.plane = this.getGridPlane();

    this.object3D.add(this.plane);
    this.objects.push(this.plane);
  }

  onChessPieceMoved(e) {
    const chessPiece = e.chessPiece;

    this.setVoxelPosition(e.chessPiece, this.childMediators.get(chessPiece));
  }

  onChessPieceRemoved(e) {
    const chessPiece = e.chessPiece;
    const mediator = this.childMediators.get(chessPiece);

    this.object3D.remove(mediator.object3D);
  }

  onChessPieceAdded(e) {
    console.log("A chessPiece has been added", e.chessPiece);
    const chessPiece = e.chessPiece;

    // TODO Depending on the Model type add different Exact Pieces
    const mediator = new KnightViewMediator(chessPiece);

    this.childMediators.set(chessPiece, mediator);

    this.setChessPiecePosition(chessPiece, mediator);

    this.object3D.add(mediator.object3D);

    this.objects.push(mediator.object3D);
    // TODO remove z
    mediator.object3D.cell = [chessPiece.x, chessPiece.y, chessPiece.z];
  }

  setChessPiecePosition(chessPiece, mediator) {
    const cube = mediator.object3D;
    const origin =
      -(this.model.cellSize * this.model.numCells) / 2 +
      this.model.cellSize / 2;

    cube.position.x = origin + chessPiece.x * this.model.cellSize;
    cube.position.z = origin + chessPiece.y * this.model.cellSize;
    cube.position.y = 0;
  }

  getGridCellFromWorldPosition(position) {
    const result = [];
    const origin =
      -(this.model.cellSize * this.model.numCells) / 2 +
      this.model.cellSize / 2;

    result[0] = Math.round((position.x - origin) / this.model.cellSize);
    result[1] = Math.round((position.z - origin) / this.model.cellSize);
    result[2] = Math.round(
      (position.y - this.model.cellSize / 2) / this.model.cellSize
    );

    if (
      result[0] >= 0 &&
      result[1] >= 0 &&
      result[2] >= 0 &&
      result[0] < this.model.numCells &&
      result[1] < this.model.numCells &&
      result[2] < this.model.numCells
    ) {
      return result;
    } else {
      return null;
    }
  }

  // TODO RENAME TO CHESSBOARD
  getGridObject(chessboard) {
    const step = chessboard.cellSize;
    const size = (step * chessboard.numCells) / 2;
    const geometry = new THREE.Geometry();

    console.log(size);
    for (let i = -size; i <= size; i += step) {
      geometry.vertices.push(new THREE.Vector3(-size, 0, i));
      geometry.vertices.push(new THREE.Vector3(size, 0, i));

      geometry.vertices.push(new THREE.Vector3(i, 0, -size));
      geometry.vertices.push(new THREE.Vector3(i, 0, size));
    }

    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2,
      transparent: true,
    });
    const lines = new THREE.LineSegments(geometry, material);

    return lines;
  }

  // TODO RENAME TO CHESSBOARD
  getGridPlane() {
    const geometry = new THREE.PlaneBufferGeometry(2000, 2000);
    geometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );

    return plane;
  }
}
