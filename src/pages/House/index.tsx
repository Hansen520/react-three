import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import house from "./house";
import grass from "./grass";
// import mesh from "./mesh";

function House() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.fog = new THREE.Fog(0xcccccc, 1000, 40000);
      // scene.add(mesh);
      scene.add(house);
      scene.add(grass);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(20000);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 20000);
      camera.position.set(4800, 4800, 4800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor(new THREE.Color("skyblue"));

      let angle = 0;
      let r = 5000;
      function render() {
        angle += 0.03;

        if (angle >= Math.PI * 2) {
          angle -= Math.PI * 2;

          r = 5000 + Math.random() * 10000;

          camera.position.y = 1000 + Math.random() * 10000;
        }

        // y(高度)固定，x,z坐标为圆周上的点，让相机进行旋转
        camera.position.x = r * Math.sin(angle); // 绕圆旋转
        camera.position.z = r * Math.cos(angle);

        camera.lookAt(0, 0, 0);

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
          纹理贴图要注意的是 ExtrudeGeometry 这种生成的几何体，uv 坐标会很大，要设置 texture.repeat 为很小的值，比如
          0.0005 这种，原则就是和 uv 坐标相乘等于 1 草地用的 PlaneGeometry，天空是直接用
          renderer.setClearColor，雾是设置在 scene.fog 的，可以用 dat.gui 可视化调试。
          相机动画这次我们做了圆周运动，确定一个半径，然后用 sin、cos 求 x、z 坐标就可以了，y
          坐标固定，这样就是一个旋转的相机动画。 这个盖房子的实战，我们练习了很多东西： 曲线和生成几何体 纹理贴图
          相机动画 dat.gui 可视化调试 还处理了模型闪烁也就是深度冲突问题，可以让物体有一点微小的偏移，也可以开启
          renderer 的 logarithmicDepthBuffer 深度缓冲区选项。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default House;
