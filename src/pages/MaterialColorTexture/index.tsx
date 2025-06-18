import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";
import mesh3 from "./mesh3";
import mesh4 from "./mesh4";

function MaterialColorTexture() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);
      scene.add(mesh3);
      scene.add(mesh4);

      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);

      const axesHelper = new THREE.AxesHelper(200);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(90, 230, 1175);
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
          点模型、线模型、网格模型都有专门的材质。 线模型想要渲染几何体需要先用 EdgesGeometry
          包裹来处理下顶点，之后可以设置 LineDashedMaterial 画虚线，但要调用 line.computeLineDistances() 做相关计算。
          网格模型的材质有很多，主要是与光照有关，可以设置 color、map，transparent、opacity 等属性。 设置透明度需要
          transparent 开启后，设置 opacity。 map 是颜色贴图也叫纹理贴图，用 TextureLoader 加载纹理图片后设置到 map。
          纹理贴图可以设置水平、竖直方向的重复次数，重复多次后再作为网格模型的纹理。 如果纹理贴图颜色不对，可以设置下
          texture.colorSpace 此外，你还可以再设置 aoMap，它会基于环境对贴图的影响做计算，加上凹凸感 颜色 color、纹理贴图
          map 都是很常用的材质属性，后面会大量用到。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default MaterialColorTexture;
