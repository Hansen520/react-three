import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
// import mesh2 from "./mesh2";
import { CSS2DRenderer } from "three/examples/jsm/Addons.js";

function Css2DAnnotation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      // 文字2D
      const css2Renderer = new CSS2DRenderer();
      css2Renderer.setSize(width, height);

      const div = document.createElement("div");
      div.style.position = "relative";
      div.appendChild(css2Renderer.domElement);
      //  绝对定位并且不响应鼠标事件
      css2Renderer.domElement.style.position = "absolute";
      css2Renderer.domElement.style.left = "0px";
      css2Renderer.domElement.style.top = "0px";
      css2Renderer.domElement.style.pointerEvents = "none";

      div.appendChild(renderer.domElement);
      (mount.current as any).appendChild(div);

      function render() {
        css2Renderer.render(scene, camera);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);

      window.onresize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        css2Renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections = rayCaster.intersectObjects(mesh.children);

        if (intersections.length) {
          const obj = intersections[0].object;
          const tag = obj.getObjectByName("tag");
          if (tag) {
            tag.visible = !tag.visible;
          }
        }
      });
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
          它是通过在 canvas 元素上加一层 div，根据 3D 物体的位置来计算出屏幕坐标的位置，调整标签位置，来实现在 3D
          物体上加标注的功能。 要标注的物体上加一个 CSS2DObject，传入 dom 元素，这样就会在那里展示一个标注。
          可以最开始设置标注的 visible 为 false，然后点击的时候再设置为 true，这样就是点击的时候显示标注的效果。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default Css2DAnnotation;
