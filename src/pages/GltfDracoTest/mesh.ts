/*
 * @Date: 2025-06-18 15:26:05
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();


const mesh = new THREE.Group();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/gltf/');
loader.setDRACOLoader(dracoLoader);


// npx gltf-pipeline -i ./public/Michelle.glb -o ./public/Michelle2.glb -d 这个命令可以压缩
loader.load("/glb/Michelle/Michelle2.glb", function (gltf) {
  // 这里 scale.setScalar(5) 就是 scale.set(5,5,5)
  gltf.scene.scale.setScalar(5);
  mesh.add(gltf.scene);
});

export default mesh;
