/*
 * @Date: 2025-06-30 17:10:14
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { map, chunk, sum } from "lodash-es";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import mesh from "./mesh";
// import mesh2 from "./mesh2";
import styles from './index.module.less';


const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);

const loader = new THREE.AudioLoader();
loader.load("/audio-api_public_superman.mp3", function (buffer) {
  audio.setBuffer(buffer);
});

document.body.addEventListener("click", () => {
  audio.pause();
  audio.play();
});

function AudioAnalyser() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      // const axesHelper = new THREE.AxesHelper(500);
      // scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      camera.position.set(0, 1000, 2000);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      // 创建柱形图
      const group = new THREE.Group();
      for (let i = 0; i < 21; i++) {
        const geometry = new THREE.BoxGeometry(100, 500, 100);
        const material = new THREE.MeshPhongMaterial({
          // color: "orange",
          vertexColors: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 250;
        mesh.position.x = i * 150;
        group.add(mesh);
      }
      group.position.x = -1500;
      group.position.y = -500;
      scene.add(group);

      const analyser = new THREE.AudioAnalyser(audio);

      // 分组
      function updateHeight() {
        const frequencyData = analyser.getFrequencyData();

        const sumArr = map(chunk(frequencyData, 50), (arr) => {
          return sum(arr);
        });

        for (let i = 0; i < group.children.length; i++) {
          const box: any = group.children[i];
          const height = sumArr[i] / 10;
          box.geometry.dispose(); // 把之前的那个的 cpu 资源释放掉
          box.geometry = new THREE.BoxGeometry(100, height, 100);
          box.position.y = height / 2;

          // 改变样式
          const positions = box.geometry.attributes.position;
          const colorsArr = [];
          const color1 = new THREE.Color("blue");
          const color2 = new THREE.Color("pink");
          for (let i = 0; i < positions.count; i++) {
            const percent = positions.getY(i) / 300;
            // 然后用 color.lerp 计算颜色插值
            const c = color1.clone().lerp(color2, percent);
            colorsArr.push(c.r, c.g, c.b);
          }
          const colors = new Float32Array(colorsArr);
          // 3个顶点
          box.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
        }
        return sumArr;
      }

      const stats = new Stats();
      (mount.current as any).appendChild(stats!.domElement);
      function render() {
        updateHeight();
        stats.update(); // 每秒 60 帧，很流畅。

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
      <section className={styles.wrapper} style={{ width: "100%", height: "100%" }}>
        <div ref={mount} style={{ width: "100%", height: "100%" }} />
      </section>
    </>
  );
}

export default AudioAnalyser;
