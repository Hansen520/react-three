/*
 * @Date: 2025-06-18 10:28:14
 * @Description: description
 */
/*
 * @Date: 2025-06-18 10:28:14
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import mesh from "./mesh";
import mesh from "./mesh2";

function VertexNormal() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);
      // scene.add(mesh3);

      const directionLight = new THREE.DirectionalLight(0xffffff, 10);
      directionLight.position.set(500, 500, 500);
      const helper = new THREE.DirectionalLightHelper(directionLight, 100);
      scene.add(directionLight);
      mesh.add(helper);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(1000);
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
          这部分法线并不是很好的理解！
          每三个顶点构成一个三角形，漫反射材质和镜面反射材质会在这个三角形上用凹凸不平或者是镜面的方式来计算光线反射的角度。
          MeshPhongMaterial 可以通过 shininess 来调节反光度。 geomety.attributes.positon 记录了顶点坐标，而
          geometry.attributes.normal 记录了和顶点一一对应的法线方向。 我们通过 BufferGeometry
          自定义的几何体就要定义和顶点坐标一一对应的法线方向，这样就可以用漫反射或者镜面反射材质来计算反光效果了。
          各种材质对光线的反射都是基于法线算出来的，法线是一个需要掌握的底层概念。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default VertexNormal;
