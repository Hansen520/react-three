/*
 * @Date: 2025-07-03 17:02:24
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";

function MatcapMaterial() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(500, 600, 800);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(500, 600, 800);
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

      window.onresize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
    }
  }, []);

  return (
    <>
      <div className="group relative">
        <button className="absolute z-990 top-0 cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          知识点
        </button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-0 bg-gray-700 text-white p-3 rounded-lg shadow-xl">
          MeshPhongMaterial、MashLambertMaterial、MeshStandardMaterial、MeshPhysicalMaterial
          都是能反光的材质，会更根据光照来计算反光效果。
          <p>
            MeshMatcapMaterial 材质。 它并不计算灯光，但可以通过提前渲染好的光泽球图片根据顶点法线来计算光照。
            换上不同的光泽球图片，就可以实现各种材质的光照效果。
          </p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default MatcapMaterial;
