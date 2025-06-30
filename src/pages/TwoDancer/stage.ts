/*
 * @Date: 2025-06-30 15:39:43
 * @Description: description
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DObject } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

const stage = new THREE.Group();

loader.load("/glb/stage.glb", function (gltf) {
  console.log(gltf);
  gltf.scene.scale.set(50, 50, 50);
  // 增加投影的接收面
  gltf.scene.traverse((obj) => {
    obj.receiveShadow = true;
  });
  stage.add(gltf.scene);
});

// 加载两个舞者
loadDancer(
  (dancer) => {
    // 文字标签
    const ele: any = document.getElementById("dialog");
    const obj = new CSS2DObject(ele);
    dancer.add(obj);
    obj.position.set(1, 0, 0);
    ele.style.display = "block";
    setTimeout(() => {
      ele.textContent = "谁叫你还搞不清楚我跟你的差别";
    }, 16000);

    dancer.name = "dancer1";
    dancer.traverse((obj: any) => {
      dancer.traverse((obj: any) => {
        obj.target = dancer;
      });
    });
  },
  200,
  Math.PI
);
loadDancer(
  (dancer) => {
    const ele: any = document.getElementById("dialog2");
    const obj = new CSS2DObject(ele);
    ele.style.display = "block";
    dancer.add(obj);
    obj.position.set(1, 0, 0);
    setTimeout(() => {
      ele.textContent = "超人没空给你给你安慰";
    }, 8000);

    dancer.traverse((obj: any) => {
      dancer.name = "dancer2";
      dancer.traverse((obj: any) => {
        obj.target = dancer;
      });
      if (obj.isMesh) {
        obj.material = obj.material.clone();
        obj.material.color.set("orange");
      }
    });
  },
  -200,
  0
);
function loadDancer(callback: (e: any) => void, z: number, angle: number) {
  loader.load("/glb/Michelle/Michelle.glb", function (gltf) {
    callback(gltf.scene);
    stage.add(gltf.scene);
    gltf.scene.scale.set(300, 300, 300);
    gltf.scene.position.z = z; // -100位置
    gltf.scene.rotateY(angle); // Math.PI

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clipAction = mixer.clipAction(gltf.animations[0]);
    clipAction.play();

    const clock = new THREE.Clock();
    function render() {
      const delta = clock.getDelta();
      mixer.update(delta);

      requestAnimationFrame(render);
    }

    render();
  });
}

export default stage;
