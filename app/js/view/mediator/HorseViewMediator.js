import ViewMediator from "./ViewMediator";
import "three/examples/js/loaders/OBJLoader";

let loader = new THREE.OBJLoader();
let model = new THREE.Object3D();
loader.load(
  // resource URL
  "chess_pieces/horse.obj",
  // called when resource is loaded
  function (object) {
    console.log("Loaded");
    model = object;
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

export default class HorseViewMediator extends ViewMediator {
  constructor(chessPiece) {
    super(chessPiece);
  }

  makeObject3D() {
    let horse = new THREE.Object3D();
    horse = model.clone();
    return horse;
  }

  getMaterialForHorse() {
    return new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("images/" + "stone.jpg"),
    });
  }
}
