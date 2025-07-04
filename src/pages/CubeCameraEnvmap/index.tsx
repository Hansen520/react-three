/*
 * @Date: 2025-07-04 11:03:13
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { ballTween, cubeCamera } from "./mesh";

function CubeCameraEnvmap() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

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
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(500, 1000, 1000);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);


      
      function render(time: number) {
        // 镜子
        cubeCamera.position.copy(mesh.children[0].position);
        cubeCamera.update(renderer, scene);

        // tween
        ballTween.update(time);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render(0);
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);
    }
  }, []);

  return (
    <>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default CubeCameraEnvmap;
