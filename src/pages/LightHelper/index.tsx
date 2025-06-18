/*
 * @Date: 2025-06-17 17:20:06
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mesh, light } from "./mesh5";
// import mesh3 from "./mesh3";

function LightHelper() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      const origin = new THREE.Vector3(0, 0, 0);
      const dir = new THREE.Vector3(1, 2, 0);
      dir.normalize();
      const arrowHelper = new THREE.ArrowHelper(dir, origin, 500, new THREE.Color("yellow"));
      scene.add(arrowHelper);

      const gridHelper = new THREE.GridHelper(1000, 10, new THREE.Color("green"), new THREE.Color("pink"));
      scene.add(gridHelper);

      const helper = new THREE.PolarGridHelper(500, 5, 20, 8);
      scene.add(helper);

      scene.add(mesh);
      scene.add(light);
      // scene.add(mesh2);
      // scene.add(mesh3);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 200, 200);
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
          DirectionalLight：平行光，光线都是平行的，一般用来实现太阳光。
          PointLight：点光源，从一个点发散的光源，类似灯泡。
          AmbientLight：环境光，均匀照射所有物体的光源，用来调亮整个场景。
          SpotLight：聚光灯，比较聚拢的光源，类似手电筒的效果，可以设置 angle 和 distance。
          HemisphereLight：半球光，天空到地面两种颜色的灯光。
          RectAreaLight：矩形平面光，从一个矩形平面发出的光，比如灯管、窗户透过的光。
          GridHelper：坐标格辅助对象，可以用来标识地面。 CameraHelper：相机辅助对象，用来可视化视椎体。
          ArrowHelper：箭头辅助对象，画个箭头来标识方向。 PolarGridHelper：极坐标格辅助对象，用来标识角度。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default LightHelper;
