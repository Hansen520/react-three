import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2, { normals } from "./mesh2";
function VectorDot() {
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

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(500, 500, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        const dir = camera.getWorldDirection(new THREE.Vector3());
        normals.forEach((normal, index) => {
          // 判断是否钝角或锐角
          if (dir.dot(normal) > 0) {
            mesh2.children[index].visible = false;
          } else {
            mesh2.children[index].visible = true;
          }
        });
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
          向量 Vector3 的 dot 方法可以计算点积，当点积大于 0，夹角是锐角，反之是钝角。 用 camera.getWorldDirection
          可以拿到 camera 的方向向量，用它和墙的法线向量做点积，就可以判断夹角是否是锐角，从而决定隐藏、显示。
          <p>dir.dot(dir2) &lt; 0 ? '钝角' : '锐角'</p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default VectorDot;
