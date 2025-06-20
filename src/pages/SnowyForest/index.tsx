/*
 * @Date: 2025-06-20 15:46:41
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mountainside from "./mountainside";
import loadTree from "./tree";
// import mesh2 from "./mesh2";
import snow from "./snow";

function SnowyForest() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mountainside);
      scene.add(snow);

      const directionLight = new THREE.DirectionalLight(0xffffff, 5);
      // 增强灯光，让阴影更加明显
      directionLight.position.set(1000, 2000, 1000);
      directionLight.castShadow = true;
      directionLight.shadow.camera.left = -2000;
      directionLight.shadow.camera.right = 2000;
      directionLight.shadow.camera.top = 2000;
      directionLight.shadow.camera.bottom = -2000;
      directionLight.shadow.camera.near = 0.5;
      directionLight.shadow.camera.far = 10000;
      scene.add(directionLight);

      // CameraHelper 做了可视化。
      // const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
      // scene.add(cameraHelper);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      // const axesHelper = new THREE.AxesHelper(500);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 100, 10000);
      camera.position.set(300, 300, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      // 开启阴影
      renderer.shadowMap.enabled = true;
      renderer.setClearColor(new THREE.Color("darkblue"));

      let angle = 0;
      let r = 1000;
      function render() {
        angle += 0.03;

        camera.position.x = r * Math.cos(angle);
        camera.position.z = r * Math.sin(angle);

        camera.lookAt(0, 0, 0);

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
          通过自定义顶点颜色实现了海拔高度的区分，拿到所有顶点坐标，根据高度用 color.lerp
          计算颜色插值，实现了不同高度的顶点颜色不同。 之后又加上了相机的圆周动画，根据角度的 cos、sin 计算相机位置的
          x、z，高度 y 保持不变。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default SnowyForest;
