/*
 * @Date: 2025-07-11 17:33:11
 * @Description: description/
 */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer } from "three/examples/jsm/Addons.js";
import mesh from "./mesh";
import gsap from "gsap";
// import mesh2 from "./mesh2";

function Css3DComputer() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  const [open, setOpen] = useState(false);

  const cameraRef = useRef<any>();

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
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor("lightblue", 0.99);
      renderer.shadowMap.enabled = true;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 100, 0); // 设置完lookat后要同时设置target

      // (mount.current as any).appendChild(renderer.domElement);
      const css3Renderer = new CSS3DRenderer();
      css3Renderer.setSize(width, height);

      const div = document.createElement("div");
      div.style.position = "relative";
      div.appendChild(css3Renderer.domElement);
      css3Renderer.domElement.style.position = "absolute";
      css3Renderer.domElement.style.top = "0";
      css3Renderer.domElement.style.left = "0";
      css3Renderer.domElement.style.pointerEvents = "none";
      // mount.current!.appendChild(div);
      div.appendChild(renderer.domElement);
      (mount.current as any).appendChild(div);

      function render(time = 0) {
        controls.update(time);
        renderer.render(scene, camera);
        css3Renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render(0);

      window.onresize = function () {
        const width = mount.current!.clientWidth;
        const height = mount.current!.clientHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
    }
  }, []);

  useEffect(() => {
    const ele: any = document.querySelector(".appComputer");
    const handler = () => {
      setOpen(true);
      // cameraRef.current!.position.set(500, 100, 0);
      gsap.to(cameraRef.current!.position, {
        x: 500,
        y: 100,
        z: 0,
        duration: 1,
      });
    };
    const handler2 = () => {
      setOpen(false);
      cameraRef.current!.position.set(1200, 500, 0);
    };
    ele.addEventListener("click", handler);
    document.addEventListener("click", handler2);

    return () => {
      ele.removeEventListener("click", handler);
      document.removeEventListener("click", handler2);
    };
  }, []);

  return (
    <>
      <div ref={mount} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }} />
      <div
        id="desktop"
        className="appComputer"
        style={{ display: "none", width: 600, height: 1100, background: "pink", backfaceVisibility: "hidden" }}
      >
        <img
          src="/computerBg.png"
          style={{ position: "absolute", left: -250, top: 250, width: 1100, height: 600, rotate: "-90deg" }}
        />
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 900,
            width: 100,
            height: 100,
            rotate: "-90deg",
            border: "1px solid red",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              background: "url('/googleLogo.png')",
              translate: "50% 0",
              backgroundSize: "cover",
            }}
          ></div>
          <div style={{ fontSize: 30, color: "#fff" }} onDoubleClick={() => setOpen(true)}>
            浏览器
          </div>
        </div>
        <iframe
          style={{
            display: open ? "block" : "none",
            width: 900,
            height: 600,
            position: "absolute",
            left: -150,
            top: 250,
            rotate: "-90deg",
          }}
          src="https://sogou.com"
        ></iframe>
      </div>
    </>
  );
}

export default Css3DComputer;
