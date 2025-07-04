/*
 * @Date: 2025-07-04 14:58:32
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { Tween } from "@tweenjs/tween.js";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
// import mesh2 from "./mesh2";

function DancingMirror() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      directionLight.castShadow = true;
      directionLight.shadow.camera.left = -200;
      directionLight.shadow.camera.right = 200;
      directionLight.shadow.camera.top = 100;
      directionLight.shadow.camera.bottom = -100;
      directionLight.shadow.camera.near = 0.5;
      directionLight.shadow.camera.far = 1000;

      const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
      // scene.add(cameraHelper);

      // 平面光，平面光不支持产生阴影，我们用平行光产生阴影
      const reactAreaLight = new THREE.RectAreaLight("white", 20, 300, 300);
      reactAreaLight.position.set(0, 500, 0);
      reactAreaLight.rotateX(-Math.PI / 2);
      reactAreaLight.lookAt(0, 0, 0);

      const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight);
      scene.add(rectAreaLightHelper);

      const axesHelper = new THREE.AxesHelper(500);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(300, 700, 300);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;

      const r = 400;
      const tween = new Tween({ angle: 0 })
        .to({ angle: Math.PI * 2 }, 20000)
        .onUpdate(function (obj) {
          const x = r * Math.cos(obj.angle);
          const z = r * Math.sin(obj.angle);
          camera.position.set(x, 200, z);

          camera.lookAt(0, 200, 0);
        })
        .repeat(Infinity)
        .start();
      function render() {
        tween.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);
      window.onresize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight;

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

export default DancingMirror;
