/*
 * @Date: 2025-06-23 10:45:15
//  * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { Easing, Tween, Group } from "@tweenjs/tween.js";

function TweenAllFeature() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(1000);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(500, 600, 800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const tween = new Tween(mesh.position).to({ x: 600 }, 2000).easing(Easing.Quadratic.InOut).repeat(0)/*.start()*/;
      
      const tween2 = new Tween(mesh.rotation).to({ x: Math.PI / 6 }, 2000).easing(Easing.Quadratic.InOut).repeat(0)/*.start()*/;

      const tweenGroup = new Group();
      tweenGroup.add(tween, tween2);

      // 先调用2然后再调用1再执行
      tween2.chain(tween);
      tween2.start();

      function render() {
        tweenGroup.update();
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
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TweenAllFeature;
