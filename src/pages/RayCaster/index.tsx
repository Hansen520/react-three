/*
 * @Date: 2025-06-19 16:08:30
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";

function RayCaster() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(500, 500, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      renderer.domElement.addEventListener("click", (e) => {
        // 网页的坐标系 y 轴的方向和标准屏幕坐标系的 y 轴是相反的，所以算出来后要取反：
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const arrowHelper = new THREE.ArrowHelper(rayCaster.ray.direction, rayCaster.ray.origin, 3000);
        scene.add(arrowHelper);

        // 相交的点
        const intersections = rayCaster.intersectObjects(mesh2.children);

        intersections.forEach((item: any) => {
          item.object.material.color = new THREE.Color("orange");
        });
      });

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
          用 Raycaster 来生成射线，用 intersectObjects 方法判断是否和网格模型相交。 点击的实现原理就是基于射线，把
          offsetX、offsetY 的网页坐标转换为 -1 到 1 的标准屏幕坐标，然后用传入 camera，用 Raycaster 的 setFromCamera
          方法生成一条射线。
          这样就会从相机的位置到你点击位置对应的三维空间的位置生成一条射线，射线穿过的物体就是被点击的。
        </div>
      </div>

      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default RayCaster;
