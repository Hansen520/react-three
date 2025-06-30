/*
 * @Date: 2025-06-30 15:36:07
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import mesh from "./mesh";
// import mesh2 from "./mesh2";
import stage from "./stage";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { CSS2DRenderer, GammaCorrectionShader, OutlinePass, ShaderPass } from "three/examples/jsm/Addons.js";
import { Easing, Group, Tween } from "@tweenjs/tween.js";
import styles from "./index.module.less";

function TwoDancer() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(stage);
      // scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 5);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      // 聚光灯
      const spotLight = new THREE.SpotLight("white", 5000000);
      spotLight.angle = Math.PI / 6;
      spotLight.position.set(0, 800, 0);
      spotLight.lookAt(0, 0, 0);
      scene.add(spotLight);
      spotLight.castShadow = true; // 投影发射面
      spotLight.shadow.camera.far = 10000;

      const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
      scene.add(cameraHelper);

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

      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const v = new THREE.Vector2(window.innerWidth, window.innerWidth);
      const outlinePass: any = new OutlinePass(v, scene, camera);
      outlinePass.edgeStrength = 10;
      outlinePass.edgeThickness = 10;
      outlinePass.pulsePeriod = 1;
      composer.addPass(outlinePass);

      const glitchPass = new GlitchPass();
      composer.addPass(glitchPass);

      const gammaPass = new ShaderPass(GammaCorrectionShader);
      composer.addPass(gammaPass);

      renderer.shadowMap.enabled = true;

      const tweenGroup = new Group();

      const css2Renderer = new CSS2DRenderer();
      css2Renderer.setSize(width, height);
      
      function render(time: number) {
        // renderer.render(scene, camera);
        css2Renderer.render(scene, camera);
        composer.render();
        requestAnimationFrame(render);

        // tweenGroup.update(time);
        // 全部动画更新
        tweenGroup.getAll().map((item) => item.update(time));
      }

      render(0);

      /* 此部分为文字标签 start */
      const div = document.createElement("div");
      div.style.position = "relative";
      div.appendChild(css2Renderer.domElement);
      css2Renderer.domElement.style.position = "absolute";
      css2Renderer.domElement.style.left = "0px";
      css2Renderer.domElement.style.top = "0px";
      css2Renderer.domElement.style.pointerEvents = "none";
      div.appendChild(renderer.domElement);
      (mount.current as any).appendChild(div);
      /* 此部分为文字标签结束 */

      const controls = new OrbitControls(camera, renderer.domElement);

      // controls.addEventListener("change", () => {
      //   console.log(camera.position);
      // });
      (mount.current as any).appendChild(renderer.domElement);

      // 点击后描边
      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections = rayCaster.intersectObjects(stage.children);

        const set = new Set();
        intersections.forEach((item: any) => {
          if (item.object.target) {
            set.add(item.object.target);
          }
        });
        outlinePass.selectedObjects = set.size ? [...set].slice(0, 1) : [];

        const dancerArr: any[] = [...set].slice(0, 1);
        outlinePass.selectedObjects = set.size ? dancerArr : [];

        if (dancerArr.length) {
          const isDancer1 = dancerArr[0].name === "dancer1";
          if (isDancer1) {
            camera.position.set(24, 955, -580);
            camera.lookAt(0, 0, 0);
          } else {
            camera.position.set(42, 1008, 479);
            camera.lookAt(0, 0, 0);
          }

          // 相机动画
          const tween = new Tween(camera.position)
            .to(isDancer1 ? { x: 24, y: 955, z: -580 } : { x: 42, y: 1008, z: 479 }, 2000)
            .repeat(0)
            .easing(Easing.Quadratic.InOut)
            .onUpdate((obj) => {
              camera.position.copy(new THREE.Vector3(obj.x, obj.y, obj.z));
              camera.lookAt(0, 0, 0);
            })
            .start();
          // 添加分组动画
          tweenGroup.add(tween);
        }
      });

      window.onresize = function () {
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const listener = new THREE.AudioListener();
      const audio = new THREE.Audio(listener);
      const loader = new THREE.AudioLoader();
      loader.load("/audio-api_public_superman.mp3", function (buffer) {
        audio.setBuffer(buffer);
      });

      document.body.addEventListener("click", () => {
        console.log(audio.isPlaying);
        if (!audio.isPlaying) {
          audio.setLoop(true);
          audio.setVolume(1);
          audio.play();
        }
      });
    }
  }, []);

  return (
    <>
      <div id="dialog" style={{ display: "none" }} className={styles.dialog}>
        I'm superman.
      </div>
      <div id="dialog2" style={{ display: "none" }} className={styles.dialog}>
        You are loser.
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TwoDancer;
