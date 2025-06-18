/*
 * @Date: 2025-06-16 16:02:39
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { tubePoints } from "./mesh";

function TubeTravel() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);

      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);

      const axesHelper = new THREE.AxesHelper(200);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      let i = 0;
      function render() {
        if (i < tubePoints.length - 1) {
          camera.position.copy(tubePoints[i]);

          camera.lookAt(tubePoints[i + 1]);
          i += 1;
        } else {
          i = 0;
        }
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
      <div>
        然后通过改变 camera 的 position 和 lookAt 实现了镜头穿梭隧道的感觉。 相机的位置是通过 curve.getSpacedPoints
        取的一堆均匀的点。
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TubeTravel;
