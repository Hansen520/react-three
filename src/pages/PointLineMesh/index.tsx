/*
 * @Date: 2025-06-13 17:09:30
 * @Description: description{}
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./points";
import mesh1 from "./line";
import mesh2 from "./mesh";
import mesh3 from "./mesh2";
import mesh4 from "./mesh3";

function PointLineMesh() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh1);
      scene.add(mesh2);
      scene.add(mesh3);
      scene.add(mesh4);

      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);

      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
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
          也可以渲染每 2 个顶点连成的线，就是线模型 Line。 还可以每 3 个顶点连成的三角形，就是网格模型 Mesh。 线模型有
          Line、LineLoop、LineSegments 三种，LineLoop 是首尾相连， LineSegments 是每两个连一条线段。 此外，Mesh
          的三角形是有正反面的概念的，从相机的角度看过去，顶点是逆时针连接的就是正面，反之是反面，默认只显示正面，也可以在材质里设置双面可见。
          几何体还支持分段，也就是分成几段再细分三角形，分段越多顶点和三角形越多，渲染越精细，但性能也会变差，所以要设置一个适中的值，一般保持默认就行。
          绝大多数情况下，我们用的是网格模型 Mesh，有时候也会用到点模型 Points 和线模型 Line。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default PointLineMesh;
