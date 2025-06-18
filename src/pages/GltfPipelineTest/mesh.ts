import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/Michelle/Michelle.glb", function (gltf) {
  console.log(gltf);
  // 这里 scale.setScalar(5) 就是 scale.set(5,5,5)
  gltf.scene.scale.setScalar(5);
  mesh.add(gltf.scene);
});

loader.load("/glb/Michelle/Michelle.gltf", function (gltf) {
  console.log(gltf);
  gltf.scene.translateX(-7);
  // 这里 scale.setScalar(5) 就是 scale.set(5,5,5)
  gltf.scene.scale.setScalar(5);
  mesh.add(gltf.scene);
});

loader.load("/glb/Michelle/model/Michelle2.gltf", function (gltf) {
  console.log(gltf);
  gltf.scene.translateX(7);
  // 这里 scale.setScalar(5) 就是 scale.set(5,5,5)
  gltf.scene.scale.setScalar(5);
  mesh.add(gltf.scene);
});

export default mesh;
