/*
 * @Date: 2025-06-19 17:17:36
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import mesh from "./mesh";
// import mesh2 from "./mesh2";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import {
  AfterimagePass,
  FilmPass,
  GammaCorrectionShader,
  GlitchPass,
  HalftonePass,
  OutlinePass,
  ShaderPass,
  SMAAPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

function AllPass() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      // scene.add(mesh2);

      const geometry = new THREE.BoxGeometry(300, 300, 300);
      const material = new THREE.MeshLambertMaterial({
        color: "orange",
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(400, 500, 600);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        // antialias: true, // 抗锯齿
      });
      renderer.setSize(width, height);

      // 创建后期通道
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // * 示例一
      // const glitchPass = new GlitchPass();
      // composer.addPass(glitchPass);

      // * 示例二
      // const afterimagePass = new AfterimagePass();
      // composer.addPass(afterimagePass);

      // * 示例三
      // 第一参数是强度，第二个参数设置 true 就是黑白电视的效果：
      // const filmPass = new FilmPass(0.5, true);
      // composer.addPass(filmPass);

      // * 示例四 发光
      // const v = new THREE.Vector2(width, height);
      // const bloomPass = new UnrealBloomPass(v, 0, 0, 0);
      // bloomPass.strength = 1;
      // bloomPass.radius = 10;
      // composer.addPass(bloomPass);

      // * 示例五
      // const halftonePass = new HalftonePass({
      //   radius: 8
      // });
      // composer.addPass(halftonePass);

      // * 示例六 边缘发光
      const v = new THREE.Vector2(width, height);
      const outlinePass = new OutlinePass(v, scene, camera);
      outlinePass.visibleEdgeColor.set("pink");
      outlinePass.edgeStrength = 20;
      outlinePass.edgeThickness = 10;
      outlinePass.pulsePeriod = 1;
      outlinePass.selectedObjects = [mesh];
      composer.addPass(outlinePass);

      // * 示例七 抗锯齿
      const pixelRatio = renderer.getPixelRatio();
      const smaaPass = new SMAAPass();
      composer.addPass(smaaPass);
      // 伽马校正, 纠正色变
      const gammaPass = new ShaderPass(GammaCorrectionShader);
      composer.addPass(gammaPass);

      function render() {
        composer.render();
        // renderer.render(scene, camera);
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
          <p>RenderPass： 和 renderer.render 一样</p>
          <p>GlitchPass： 故障闪屏效果</p>
          <p>AfterimagePass：运动残影效果</p>
          <p>FilmPass：电影雪花效果，可设置灰度</p>
          <p>UnrealBloomPass：发光效果</p>
          <p>HalftonePass：三色圆点效果</p>
          <p>OutlinePass：描边效果</p>
          <p>SMAAPass：抗锯齿</p>
          <p>伽马校正：用了后期通道后颜色异常的修复</p>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default AllPass;
