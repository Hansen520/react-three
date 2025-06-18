import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";
import mesh3 from "./mesh3";
import mesh4 from "./mesh4";
import mesh5 from "./mesh5";

function Curve() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      // scene.add(mesh2);
      // scene.add(mesh3);
      scene.add(mesh4);
      scene.add(mesh5);

      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);

      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(0, 100, 200);
      camera.lookAt(0, 0, 0);

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
          椭圆曲线 EllipseCurve：画椭圆、圆曲线 样式曲线 SplineCurve：画经过一些点的曲线 二次贝塞尔曲线
          QuadraticBezierCurve：可以通过控制点调节曲率，有一个控制点 三次贝塞尔曲线
          CubicBezierCurve3：可以画三维曲线，通过控制点调节曲率，有两个控制点 直线
          LineCurve：直线是曲线的一种特殊情况，传入两个端点 曲线路径 CurvePath：可以传入多条曲线，组合起来
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default Curve;
