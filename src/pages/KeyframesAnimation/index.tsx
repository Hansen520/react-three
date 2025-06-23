/*
 * @Date: 2025-06-23 11:21:06
 * @Description: descripti/
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";

function KeyframesAnimation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(300, 300, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      mesh.name = "Box";
      // 给 mesh 加上 name 属性，然后定义它在 0、2、5 秒的值，创建 KeyframeTrack，也就是一个属性变化的关键帧。
      const times = [0, 2, 5];
      // 就是说2s后变成100，5s后变成-100
      const valus = [0, 0, 0, 0, 100, 0, 0, 0, -100];
      const track = new THREE.KeyframeTrack("Box.position", times, valus);
      // const clip = new THREE.AnimationClip('hello', 5, [track]);

      const times2 = [0, 1, 4];
      const values2 = [1, 1, 1, 1, 2, 1, 1, 0.5, 1];
      const track2 = new THREE.KeyframeTrack("Box.scale", times2, values2);

      const clip = new THREE.AnimationClip("hello", 5, [track, track2]);

      // const mixer = new THREE.AnimationMixer(mesh);
      // const clipAction = mixer.clipAction(clip);
      // clipAction.play();

      // clipAction.timeScale = 2;
      // setTimeout(() => {
      //   clipAction.paused = true;
      // }, 2000);

      const clock = new THREE.Clock();
      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        const delta = clock.getDelta();
        // mixer.update(delta);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);
    }
  }, []);

  return (
    <>
      <div className="group relative">
        <button className="absolute z-990 top-0 cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          知识点
        </button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-0 bg-gray-700 text-white p-3 rounded-lg shadow-xl">
          它和 css 的关键帧动画一样，定义一些属性变化的关键帧 KeyframeTrack，每个属性都有 times、values 的变化数组。
          然后定义这个关键帧动画 AnimationClip 的名字、持续时间等。 最后用 AnimationMixer 播放就好了，可以
          play、paused、也可以控制 timeScale 播放速率。 gltf 模型上自带的 animations 关键帧动画，同样是用 AnimationMixer
          来播放。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default KeyframesAnimation;
