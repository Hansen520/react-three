import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import mesh2 from "./mesh2";
function PostProcessing() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(300, 200, 400);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 20000);
      camera.position.set(0, 500, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const v = new THREE.Vector2(width, height);
      const outlinePass = new OutlinePass(v, scene, camera);
      outlinePass.visibleEdgeColor.set("orange"); // 颜色

      outlinePass.edgeStrength = 10; // 亮度
      outlinePass.edgeThickness = 10; // 描边厚度
      outlinePass.pulsePeriod = 1; // 是闪烁频率，每 1 秒闪烁一次

      composer.addPass(outlinePass);

      const bloomPass = new UnrealBloomPass(v, 0, 0, 0);
      bloomPass.strength = 0.5;
      // composer.addPass(bloomPass);

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections = rayCaster.intersectObjects(mesh2.children);
        if (intersections.length) {
          // 描边
          outlinePass.selectedObjects = [intersections[0].object];
          // 点击马的时候再发光
          if (!composer.passes.includes(bloomPass)) {
            composer.addPass(bloomPass);
          }
        } else {
          // 取消描边
          outlinePass.selectedObjects = [];
          composer.removePass(bloomPass);
        }
      });
      function render() {
        // renderer.render(scene, camera);
        composer.render();
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

export default PostProcessing;
