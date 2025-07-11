/*
 * @Date: 2025-07-11 17:33:11
 * @Description: description/
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
// import mesh2 from "./mesh2";

function Css3DComputer() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
      directionalLight.position.set(-100, 1000, 0);
      directionalLight.lookAt(0, 0, 0);

      directionalLight.castShadow = true;
      directionalLight.shadow.camera.left = -800;
      directionalLight.shadow.camera.right = 800;
      directionalLight.shadow.camera.top = 500;
      directionalLight.shadow.camera.bottom = -500;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 2000;

      // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(1200, 500, 0);
      camera.lookAt(0, 100, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor("lightblue", 0.99);
      renderer.shadowMap.enabled = true;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 100, 0); // 设置完lookat后要同时设置target

      function render(time = 0) {
        controls.update(time);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render(0);

      (mount.current as any).appendChild(renderer.domElement);

      window.onresize = function () {
        const width = mount.current!.clientWidth;
        const height = mount.current!.clientHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
    }
  }, []);

  return (
    <>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default Css3DComputer;
