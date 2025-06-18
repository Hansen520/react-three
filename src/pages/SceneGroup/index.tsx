/*
 * @Date: 2025-06-17 15:24:35
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";

function SceneGroup() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);
      group.position.x = 200;
      group.translateZ(200);
      mesh.position.x = 200;

      const pos = new THREE.Vector3();
      mesh.getWorldPosition(pos);
      console.log(pos);
      console.log(group.position);
      console.log(mesh.position);

      // console.log(scene, 29);
      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.material.color = new THREE.Color("pink");
        }
      });

      const cube = scene.getObjectByName("cube") as any;
      cube!.material!.color = new THREE.Color("lightgreen");

      // scene.add(mesh);
      // scene.add(mesh2);
      // scene.add(mesh3);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(1000);
      scene.add(axesHelper);

      const axesHelper2 = new THREE.AxesHelper(200);
      group.add(axesHelper2);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(500, 500, 500);
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
        <button className="absolute z-990 top-0 cursor-pointer bg-green-500 text-white px-4 py-2 rounded">知识点</button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-0 bg-gray-700 text-white p-3 rounded-lg shadow-xl">
        Mesh 如果添加到 Group 中，那它的 position 就是相对于 Group
        的，叫做局部坐标，而它相对于坐标原点的，叫做世界坐标，可以通过 obj.getWorldPosition 来拿到。 遍历这颗对象树，用
        traverse 的 API，还可以通过 isMesh、isPoints 等来区分具体的类型，或者通过 getObjectByName、getObjectById
        来查找特定对象。 复杂的场景基本都是一个很大的对象树，后面会经常需要遍历 scene、查找某个具体的对象。 const group
        = new THREE.Group(); group.add(mesh); scene.add(group); group.position.x = 200; group.translateZ(200);
        mesh.position.x = 200;</div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default SceneGroup;
