/*
 * @Date: 2025-06-18 14:45:27
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/gltf2/CesiumMan.gltf", function (gltf) {
  mesh.add(gltf.scene);
  gltf.scene.scale.set(50, 50, 50);

  gltf.scene.traverse((obj: any) => {
    if (obj.isMesh) {
      console.log(obj.name, obj);
      obj.material.wireframe = true;
      obj.material.color.set("orange");
      obj.material.map = null;
    }
  });
});

loader.load("/glb/gltf3/CesiumMan.gltf", function (gltf) {
    mesh.add(gltf.scene);

    gltf.scene.scale.set(50, 50, 50);
    gltf.scene.translateX(-50);

    gltf.scene.traverse((obj: any) => {
        if(obj.isMesh) {
            obj.material.wireframe = true;
            obj.material.color.set('lightblue');
            obj.material.map = null;
        }
    })
});

loader.load("/glb/gltf1/CesiumMan.glb", function (gltf) {
    mesh.add(gltf.scene);

    gltf.scene.scale.set(50, 50, 50);
    gltf.scene.translateX(50);

    gltf.scene.traverse((obj: any) => {
        if(obj.isMesh) {
            obj.material.wireframe = true;
            obj.material.color.set('lightgreen');
            obj.material.map = null;
        }
    })
});
export default mesh;
