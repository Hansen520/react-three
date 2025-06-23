import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import mesh2 from "./mesh2";

function MorphAnimation() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff, 2);
      directionLight.position.set(500, 400, 300);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 800, 800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      mesh.name = "Kkk";
      // 定义两个 KeyframeTrack 关键帧属性变化，分别改变 morphTargetInfluences[0] 和 [1]，定义在 0-3s 和 3-6s 里对应的值的变化。
      const track1 = new THREE.KeyframeTrack("Kkk.morphTargetInfluences[0]", [0, 3], [0, 0.5]);
      const track2 = new THREE.KeyframeTrack("Kkk.morphTargetInfluences[1]", [3, 6], [0, 1]);
      const clip = new THREE.AnimationClip("aaaa", 6, [track1, track2]);

      const mixer = new THREE.AnimationMixer(mesh);
      const clipAction = mixer.clipAction(clip);
      clipAction.play();

      const clock = new THREE.Clock();
      function render() {
        const delta = clock.getDelta();
        mixer.update(delta);

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
          通过 geometry.morphAttributes.position 定义一些变形目标的顶点。 然后通过 mesh.morphTargetInfluences
          调整每个变形目标的影响比重，就可以实现变形效果。 然后配合关键帧动画就可以播放这个变形动画。
          很多模型自带了变形动画，可以和之前一样用 AnimationMixer 来播放。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default MorphAnimation;
