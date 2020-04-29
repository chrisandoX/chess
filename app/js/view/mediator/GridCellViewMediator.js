import ViewMediator from "./ViewMediator";

export default class GridCellViewMediator extends ViewMediator {
  constructor(gridCell) {
    super(gridCell);
  }

  makeObject3D() {
    const geometry = new THREE.PlaneBufferGeometry(
      this.model.size,
      this.model.size
    );
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, this.getMaterial(this.model.color));

    return mesh;
  }

  getMaterial(color) {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      opacity: 0.0,
      transparent: true,
    });
  }
}
