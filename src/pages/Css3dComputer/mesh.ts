import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/monitor.glb", function (gltf) {
  console.log(gltf);
  mesh.add(gltf.scene);
  gltf.scene.scale.set(220, 220, 220);
  gltf.scene.position.set(0, 280, 0);
  gltf.scene.traverse((obj) => {
    obj.castShadow = true;
  });
});

loader.load("/glb/desk1.glb", function (gltf) {
  console.log(gltf);
  mesh.add(gltf.scene);
  gltf.scene.scale.set(380, 380, 380);
  gltf.scene.rotateY(Math.PI / 2);

  gltf.scene.traverse((obj) => {
    obj.receiveShadow = true; // 接收阴影
  });
});

export default mesh;
