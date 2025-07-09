/*
 * @Date: 2025-07-09 14:29:21
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import mesh from "./mesh";
import mesh2 from "./mesh2";

function CannonWorld() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(500, 600, 800);
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

      function render() {
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
      <div className="group relative">
        <button className="absolute z-990 top-0 cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          知识点
        </button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-0 bg-gray-700 text-white p-3 rounded-lg shadow-xl">
          引入 cannon-es，定义一个 Word，然后定义一些刚体(Body），它们都有形状 Shape、材质 Material、位置等属性。
          在渲染循环里更新 cannon，并且把最新位置、旋转角度复制给 3D 场景的物体。
          此外，两种材质碰撞时的弹力、摩擦力等也可以自定义。通过 ContactMaterial 来定义 Cannon 定义了一些形状，比如
          Box、Sphere、Cylinder 等，但总有一些不规则形状，这种就可以通过凸多面体 ConvexPolyhedron 来定义。
          它是通过定义顶点 vertices、面 faces 来实现的。 从几何体 geometry 中取出顶点和顶点索引，设置到凸多面体就好了。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default CannonWorld;
