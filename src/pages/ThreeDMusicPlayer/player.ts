import * as THREE from "three";

const player = new THREE.Group();

function createCanvas() {
  const dpr = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const w = (canvas.width = 100 * dpr);
  const h = (canvas.height = 100 * dpr);

  const c = canvas.getContext("2d");
  c!.translate(w / 2, h / 2);

  c!.arc(0, 0, 40 * dpr, 0, Math.PI * 2);
  c!.fillStyle = "orange";
  c!.fill();
  c!.beginPath();
  c!.moveTo(-10 * dpr, -20 * dpr);
  c!.lineTo(-10 * dpr, 20 * dpr);
  c!.lineTo(20 * dpr, 0);
  c!.closePath();
  c!.fillStyle = "white";
  c!.fill();
  return canvas;
}

function createBtn() {
  const geometry = new THREE.BoxGeometry(100, 80, 100);
  const texture = new THREE.CanvasTexture(createCanvas());
  const material = new THREE.MeshPhysicalMaterial({
    // color: 'white',
    map: texture,
    roughness: 0.3,
  });
  const btn = new THREE.Mesh(geometry, material);

  const g = new THREE.PlaneGeometry(100, 100);
  const m = new THREE.MeshPhysicalMaterial({
    color: "white",
    map: texture,
    transparent: true,
    roughness: 0.3,
  });
  const plane = new THREE.Mesh(g, m);
  plane.rotateX(-Math.PI / 2);
  plane.position.y = 41;

  btn.add(plane);
  return btn;
}

const playBtn = createBtn();
player.add(playBtn);

export default player;
