/*
 * @Date: 2025-06-23 16:16:26
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { CSS3DRenderer } from "three/examples/jsm/Addons.js";
import mesh2 from "./mesh2";

function Css3DAnnotation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      scene.add(mesh2);

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
      camera.position.set(500, 600, 800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      // 3D文字
      const css3Renderer = new CSS3DRenderer();
      css3Renderer.setSize(width, height);

      const div = document.createElement("div");
      div.style.position = "relative";
      div.appendChild(css3Renderer.domElement);
      css3Renderer.domElement.style.position = "absolute";
      css3Renderer.domElement.style.left = "0px";
      css3Renderer.domElement.style.top = "0px";
      css3Renderer.domElement.style.pointerEvents = "none";

      div.appendChild(renderer.domElement);
      (mount.current as any).appendChild(div);

      function render() {
        css3Renderer.render(scene, camera);
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
      <div ref={mount} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", transform: "rotateZ(0deg)"}} />
    </>
  );
}

export default Css3DAnnotation;
