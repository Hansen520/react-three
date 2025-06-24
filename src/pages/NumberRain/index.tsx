/*
 * @Date: 2025-06-24 10:41:03
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
// import mesh2 from "./mesh2";

function NumberRain() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      // const directionLight = new THREE.DirectionalLight(0xffffff);
      // directionLight.position.set(100, 100, 100);
      // scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 300, 10000);
      camera.position.set(width / 2, height / 2, 500);
      // 设置controls，要把controls要去掉
      camera.lookAt(width / 2, height / 2, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.target.set(width / 2, height / 2, 0);
      (mount.current as any).appendChild(renderer.domElement);
    }
  }, []);

  return (
    <>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default NumberRain;
