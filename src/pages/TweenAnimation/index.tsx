/*
 * @Date: 2025-06-23 10:06:05
//  * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";

import { Tween, Easing } from "@tweenjs/tween.js";
// import mesh2 from "./mesh2";

function TweenAnimation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 50, 200);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      // const clock = new THREE.Clock();

      const r = 50;
      const tween = new Tween({ angle: 0 })
        .to({ angle: Math.PI * 2 }, 5000)
        .onUpdate(function (obj) {
          camera.position.x = r * Math.cos(obj.angle);
          camera.position.z = r * Math.sin(obj.angle);

          camera.lookAt(0, 0, 0);
        })
        .easing(Easing.Quadratic.InOut)
        .repeat(Infinity)
        .start();
      function render(time: number) {
        // const delta = clock.getDelta();
        // if (mesh.position.x < 100) {
        //   mesh.position.x += 1;
        //   mesh.position.y += 1;
        // }
        // if (mesh.position.x < 100) {
        //   mesh.position.x += delta * 30;
        //   mesh.position.y += delta * 30;
        // }
        tween.update(time);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render(1000);
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
          <p>它只要指定开始数值、结束数值、动画时间、缓动效果，就可以实现动画。</p>
          <p>只要每一帧渲染的时候调用 update传入当前时间就好了。 </p>
          <p>缓动动画是开始有段加速、结束的时候有段减速，类似这种有缓冲过程的动画，会看起来比较自然。</p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TweenAnimation;
