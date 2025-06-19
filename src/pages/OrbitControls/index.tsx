/*
 * @Date: 2025-06-19 11:00:02
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function OrbitControlsss() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshPhongMaterial({
        color: "orange",
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
      scene.add(cameraHelper);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(800);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(447, 198, -112);
      camera.lookAt(-373, -160, -257);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      const controls = new OrbitControls(camera, renderer.domElement);
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = 10.0;
      // controls.enableDamping = true;
      // controls.enableRotate = false;
      // controls.mouseButtons = {
      //   RIGHT: THREE.MOUSE.ROTATE,
      //   LEFT: THREE.MOUSE.PAN,
      // };
      controls.maxPolarAngle = Math.PI / 2;
      controls.target.set(-373, -160, -257); // 改完后需要同步才可以

      controls.addEventListener("change", () => {
        console.log(camera.position, controls.target);
      });

      function render() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();

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
          可以开启 autoRotate 自动旋转，可以加上惯性 enableDamping，可以开启 rotate、zoom、pan，也可以限制 rotate 的范围
          maxPolarAngle 我们经常监听 change 事件来可视化调节相机的位置和焦点，就是打印 camera.position 和
          controls.target。 但是要注意 OrbitControls 默认会把焦点调回 0,0,0，调好之后要同步设置 camera.lookAt 和
          controls.target.set
          <pre>
            controls.autoRotate = true;
            controls.autoRotateSpeed = 10.0;
            controls.enableDamping = true;
            controls.enableRotate = false;
            controls.mouseButtons =
            {JSON.stringify({
              RIGHT: THREE.MOUSE.ROTATE,
              LEFT: THREE.MOUSE.PAN,
            })};
            controls.maxPolarAngle = Math.PI / 2;
          </pre>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default OrbitControlsss;
