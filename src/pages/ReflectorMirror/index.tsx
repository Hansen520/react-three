/*
 * @Date: 2025-07-04 11:27:17
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { cubeCamera, cubeCamera2 } from "./mesh";
import mesh2 from "./mesh2";

function ReflectorMirror() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      scene.add(mesh2);

      const textureCube = new THREE.CubeTextureLoader()
        .setPath("/city/")
        .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
      scene.background = textureCube;

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(300, 300, 300);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);

      // const mirror1: any = mesh.getObjectByName("mirror1");
      // const mirror2: any = mesh.getObjectByName("mirror2");

      function render() {
        // cubeCamera.position.copy(mirror1.position);
        // cubeCamera.update(renderer, scene);

        // cubeCamera2.position.copy(mirror2.position);
        // cubeCamera2.update(renderer, scene);

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
          Reflector 是专门用来做镜面效果的，它可以实现两个镜子的相互反射，比较逼真。 所以，如果是设置 envMap，可以用
          CubeCamera 来拍，比如汽车车身、车窗反射的光线。但如果是专门实现镜子，还是用 Reflector 来做更好。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default ReflectorMirror;
