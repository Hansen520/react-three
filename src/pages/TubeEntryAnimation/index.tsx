/*
 * @Date: 2025-06-23 12:22:30
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from './mesh';
import tube, { tubePoint } from './tube';
import { Easing, Tween } from "@tweenjs/tween.js";

function TubeEntryAnimation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  

  useEffect(() => {
    {
      scene.add(mesh, tube);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 800, 800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const tween = new Tween({
        x: 0,
        y: 500,
        z: 800,
        rotation: 0
      }).to({
        x: 200,
        y: 800,
        z: 800,
        rotation: 180
      }).repeat(0).easing(Easing.Quadratic.InOut).onUpdate((obj) => {
        camera.position.copy(new THREE.Vector3(obj.x, obj.y, obj.z));
        camera.lookAt(0, 0, 0);

        mesh.rotation.y = obj.rotation / 180 * Math.PI;
      });

      let started = false;
      let i = 0;
      function render(time: number) {
        // if (i < tubePoint.length - 1) {
        //   // 相机位置跟着tubePoint的中间走
        //   camera.position.copy(tubePoint[i]);
        //   // 看向中心点
        //   camera.lookAt(tubePoint[i + 1]);
        //   i += 3;
        // }
        // 加一个 flag，当到达管道末尾的时候，把管道删除，然后开启动画。
        if (i < tubePoint.length - 1) {
          camera.position.copy(tubePoint[i]);
          camera.lookAt(tubePoint[i + 1]);
          i += 4;
        } else {
          if (!started) {
            scene.remove(tube);
            tween.start();
            started = true;
          }
        }
        tween.update(time);
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

export default TubeEntryAnimation;
