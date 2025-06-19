/*
 * @Date: 2025-06-19 16:40:26
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/Horse.gltf", function (gltf) {
  console.log(gltf);
  mesh.add(gltf.scene);

  gltf.scene.scale.set(50, 50, 50);

  gltf.scene.traverse((obj: any) => {
    // obj.target = gltf.scene;， 这个是说点击任何部位都会触发整个
    if (obj.isMesh) {
      if (obj.name === "Cylinder") {
        obj.material.color = new THREE.Color("white");
      } else if (obj.name === "Cylinder_1") {
        obj.material.color = new THREE.Color("pink");
      }
    }
  });
});

export default mesh;
