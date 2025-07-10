/*
 * @Date: 2025-07-09 17:05:44
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { DragControls, FirstPersonControls, FlyControls, TransformControls } from "three/examples/jsm/Addons.js";
// import mesh2 from "./mesh2";

function AllControls() {
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

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(500, 500, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const box1: any = scene.getObjectByName("box"); // 获取box
      const box2: any = scene.getObjectByName("box2");

      // 案例一

      const controls = new DragControls([box1, box2], camera, renderer.domElement);

      controls.addEventListener("dragstart", function (event: any) {
        event.object.material.color.set("lightgreen");
      });

      controls.addEventListener("dragend", function (event: any) {
        event.object.material.color.set("orange");
      });

      controls.addEventListener("hoveron", (event: any) => {
        event.object.material.wireframe = true;
      });

      controls.addEventListener("hoveroff", (event: any) => {
        event.object.material.wireframe = false;
      });

      // 案例二, 上下左右键控制
      // const controls = new FlyControls(camera, renderer.domElement);
      // controls.movementSpeed = 100;
      // controls.rollSpeed = Math.PI / 10;
      // const clock = new THREE.Clock();

      // 案例三
      // const controls = new FirstPersonControls(camera, renderer.domElement);
      // controls.movementSpeed = 100;
      // const clock = new THREE.Clock();

      // 案例四, 可以上下作用的移动
      const controls1 = new TransformControls(camera, renderer.domElement);
      controls1.attach(box1);
      // controls.showX = false; // 隐藏x轴
      scene.add(controls1.getHelper());
      controls1.setMode("rotate");

      function render() {
        // controls.update(clock.getDelta());
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      // const controls = new OrbitControls(camera, renderer.domElement);
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
          <p>FlyControls：飞行控制器，通过上下左右键和鼠标来控制前进后退、方向旋转</p>
          <p>FirstPersonControls：类似飞行控制器，但是上下角度不能超过 90 度</p>
          <p>MapControls： 和 OrbitControls 一样，但是左键平移，右键旋转</p>
          <p>TransformControls：用来移动、缩放、旋转场景中的物体</p>
          <p>DragControls：用来拖动场景中的物体</p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default AllControls;
