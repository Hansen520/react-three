/*
 * @Date: 2025-06-20 15:59:54
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const tree = new THREE.Group();

const loader = new GLTFLoader();

function loadTree(callback: any) {
  loader.load("/glb/tree/tree.gltf", (gltf) => {
    console.log(gltf);

    gltf.scene.scale.set(10, 10, 10);

    tree.add(gltf.scene);

    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true; // 需要投放的阴影
        if (obj.name === "leaves001") {
          obj.material.color.set("green");
        } else {
          obj.material.color.set("brown");
        }
      }
    });

    callback(tree);
  });
}

export default loadTree;
