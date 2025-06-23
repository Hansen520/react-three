/*
 * @Date: 2025-06-23 15:20:30
 * @Description: description
 */
/*
 * @Date: 2025-06-23 15:20:30
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import mesh from "./mesh";
// import mesh2 from "./mesh2";

function GsapTest() {
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

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(200, 300, 300);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);

      const r = 50;

      const rotationObj = { angle: 0 };
      gsap.to(rotationObj, {
        angle: Math.PI * 2,
        duration: 5,
        ease: "quad.inOut",
        repeat: -1, // -1 表示无限循环
        onUpdate: function () {
          // 更新相机位置
          camera.position.x = r * Math.cos(rotationObj.angle);
          camera.position.z = r * Math.sin(rotationObj.angle);

          // 始终看向原点
          camera.lookAt(0, 0, 0);
        },
      });

      const tl = gsap.timeline();

      // 定义串行动画
      tl.to(mesh.position, { duration: 2, x: 300 })
        .to(mesh.rotation, { duration: 1, y: Math.PI / 3 }, "+=3")
        // 加一个 < 就代表和前一个动画并行
        .to(mesh.scale, { duration: 1, x: 2 } /*'<'*/);

      (mount.current as any).appendChild(renderer.domElement);
    }
  }, []);

  return (
    <>
      <div className="group relative">
        <button className="absolute z-990 top-0 cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          知识点
        </button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-0 bg-gray-700 text-white p-3 rounded-lg shadow-xl">
          gsap 和 tween.js 一样都是常用的动画库，功能差不多，但 gsap 用起来更简单： 它不用在渲染循环里手动
          update，内部做了处理 它定义串行、并行动画更简单。 其余的功能，比如定义 duration、onUpdate、ease
          函数等都差不多。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default GsapTest;
