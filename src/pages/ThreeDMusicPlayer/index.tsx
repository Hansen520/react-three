/*
 * @Date: 2025-07-04 15:45:27
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import player from "./player";
import analyser from "./analyser";
import note from "./note";
import lyric, { lyricPositions } from "./lyric";
import { map, chunk, sum } from "lodash-es";
import { Easing, Group, Tween } from "@tweenjs/tween.js";
import { SimplexNoise } from "three/examples/jsm/Addons.js";


// import lyricList from "./lyric";
// import mesh2 from "./mesh2";
function ThreeDMusicPlayer() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);

  const loader = new THREE.AudioLoader();
  loader.load("/audio-api_public_superman.mp3", function (buffer) {
    audio.setBuffer(buffer);
    audio.autoplay = false;
  });

  useEffect(() => {
    {
      scene.add(player);
      player.position.x = 800;
      player.position.z = 600;
      scene.add(analyser);
      scene.add(note);
      scene.add(lyric);
      lyric.position.y = 350;
      analyser.position.y = -200;
      analyser.scale.z = 0.5;
      analyser.rotateX(Math.PI /8);

      
      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 300, 10000);
      camera.position.set(0, 800, 1500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);

      const audioAnalyser = new THREE.AudioAnalyser(audio);
      function updateHeight() {
        const frequencyData = audioAnalyser.getFrequencyData();

        // 将频率数据分成50个块
        const sumArr = map(chunk(frequencyData, 50), (arr: any) => {
          return sum(arr);
        }).reverse();

        // 细琢磨
        for (let i = 0; i < analyser.children.length; i++) {
          const mesh = analyser.children[i];
          const height = sumArr[i] / 4000;
          mesh.scale.z = height;
        }
      }

      const tweenGroup = new Group();
      let i = 0;
      function render() {
        if (lyricPositions.length && audio.isPlaying) {
          const mSeconds = Math.floor(audio.context.currentTime * 1000);
          if (i >= lyricPositions.length - 1) {
            // 复原到原位
            lyric.position.z = lyricPositions[lyricPositions.length - 1][1];
          } else if (mSeconds > lyricPositions[i][0] && mSeconds < lyricPositions[i + 1][0]) { // 在歌曲范围内
            const tween = new Tween(lyric.position)
              .to(
                {
                  z: lyricPositions[i][1] + 300, // 移动z
                },
                300
              )
              .easing(Easing.Quadratic.InOut)
              .repeat(0)
              .start()
              .onComplete(() => {
                tweenGroup.remove(tween);
              });
            tweenGroup.add(tween);
            i++;
            // lyric.position.z = lyricPositions[i][1];
            // i++;
          }
        }

        tweenGroup.update();
        updateHeight(); // 动态变化高度
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);

      const playerBtn: any = player.getObjectByName("playBtn");
      const pauseBtn: any = player.getObjectByName("pauseBtn");

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections: any = rayCaster.intersectObjects(player.children);

        if (intersections.length) {
          const obj = intersections[0].object.target;
          if (obj) {
            if (obj.name === "playBtn") {
              obj.scale.y = 0.6;
              obj.position.y = (-80 * 0.4) / 2;

              pauseBtn.scale.y = 1;
              pauseBtn.position.y = 0;
              audio.play();
            } else if (obj.name === "pauseBtn") {
              obj.scale.y = 0.6;
              obj.position.y = (-80 * 0.4) / 2;

              playerBtn.scale.y = 1;
              playerBtn.position.y = 0;
              audio.pause();
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default ThreeDMusicPlayer;
