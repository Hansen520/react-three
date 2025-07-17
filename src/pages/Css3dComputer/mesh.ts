/*
 * @Date: 2025-07-11 17:33:53
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS3DObject } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/monitor.glb", function (gltf) {
  console.log(gltf);
  mesh.add(gltf.scene);
  gltf.scene.scale.set(220, 220, 220);
  gltf.scene.position.set(0, 280, 0);

  const ele: any = document.getElementById('desktop');
  const css3dObj = new CSS3DObject(ele);
  css3dObj.rotateX(-Math.PI / 2);
  css3dObj.scale.set(0.01, 0.01, 0.01);
  css3dObj.position.y = 2;
  css3dObj.position.x = -0.16;

  gltf.scene.traverse((obj: any) => {
    if (obj.isMesh) {
      console.log(obj.name, obj);
      if (obj.name === "Object_4") {
        obj.material.color.set("orange");
      }
      if (obj.name === "Object_5") {
        const helper = new THREE.AxesHelper(1000);
        obj.add(helper);
        obj.add(css3dObj);
      }
    }
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
