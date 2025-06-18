/*
 * @Date: 2025-06-13 16:31:11
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

function PerspectiveCamera() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);

      const gui = new GUI();

      const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
      const cameraHelper = new THREE.CameraHelper(camera2);
      scene.add(cameraHelper);

      function onChange() {
        camera2.updateProjectionMatrix();
        cameraHelper.update();
      }

      gui.add(camera2, "fov", [30, 60, 10]).onChange(onChange);
      gui
        .add(camera2, "aspect", {
          "16/9": 16 / 9,
          "4/3": 4 / 3,
        })
        .onChange(onChange);
      gui.add(camera2, "near", 0, 300).onChange(onChange);
      gui.add(camera2, "far", 300, 800).onChange(onChange);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

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
          fov：影响可视范围角度、离物体远近 aspect：可视范围宽高比，一般设置网页宽高比
          near：近裁截面距离，一般保持默认值 0.1，当你需要截掉一些特别近的物体的时候，把它加大
          far：远裁截面距离，如果有的物体被裁截掉看不到了，就需要调大 far 把它们包含进来
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default PerspectiveCamera;
