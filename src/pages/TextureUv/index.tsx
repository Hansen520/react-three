/*
 * @Date: 2025-06-16 14:26:39
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import mesh from "./mesh";
import mesh2 from "./mesh2";

function TextureUv() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);

      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);

      const axesHelper = new THREE.AxesHelper(200);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(0, 100, 200);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      function render() {
        mesh2.material.map!.offset.y += 0.01;
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
          纹理贴图如何映射到网格模型上是通过 uv 坐标决定的，也就是 geometry.attributes.uv，它和顶点一一对应。
          我们可以修改不同顶点的 uv 坐标来实现纹理贴图的裁剪、旋转等效果。 texture.offset
          可以让纹理贴图偏移一段距离，相当于改变了 uv 坐标，所以修改 texture.offset 的动画也叫做 uv 动画。
          texture.offset 的偏移需要结合 texture.wrapT、textrue.wrapS 来设置，实现纹理贴图无限滚动的效果。
          各种几何体都有默认的顶点 uv 坐标，当你需要对纹理贴图做一些处理的时候，可以自定义 uv 坐标。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TextureUv;
