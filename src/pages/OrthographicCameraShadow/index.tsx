/*
 * @Date: 2025-06-19 10:19:05
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const gui = new GUI();
// import mesh2 from "./mesh2";

function OrthographicCameraShadow() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(1000, 1000, 500);
      directionLight.castShadow = true;
      directionLight.shadow.camera.left = -500;
      directionLight.shadow.camera.right = 500;
      directionLight.shadow.camera.top = 500;
      directionLight.shadow.camera.bottom = -500;
      directionLight.shadow.camera.near = 0.1;
      directionLight.shadow.camera.far = 3000;
      scene.add(directionLight);

      gui.add(directionLight.position, "x", 0, 10000);
      gui.add(directionLight.position, "y", 0, 10000);
      gui.add(directionLight.position, "z", 0, 10000);

      const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
      scene.add(cameraHelper);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(800);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(800, 400, 600);
      camera.lookAt(0, 0, 0);

      // const aspectRatio = width / height;
      // const num = 500;
      // const camera2 = new THREE.OrthographicCamera(-num * aspectRatio, num * aspectRatio, num, -num, 0.1, 5000);
      // camera2.position.set(400, 200, 300);
      // camera2.lookAt(0, 0, 0);
      // const cameraHelper = new THREE.CameraHelper(camera2);
      // scene.add(cameraHelper);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true; // 开启阴影

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
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
          透视投影相机是近大远小效果，而正投影相机是远近一样大。
          正投影相机确实用的比较少，但在设置平行光阴影的时候会用到。
          <p>6种灯光里只有点光源、聚光灯、平行光可以产生阴影，需要在 renderer 开启阴影 shadowMap.enabled，在灯光处开启阴影
          castShadow，在产生阴影的物体设置阴影 castShadow，在接收阴影的物体设置 receiveShadow。</p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default OrthographicCameraShadow;
