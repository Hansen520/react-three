/*
 * @Date: 2025-06-24 11:27:19
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { Easing, Group, Tween } from "three/examples/jsm/libs/tween.module.js";
// import mesh2 from "./mesh2";

function PieChart() {
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
      camera.position.set(500, 600, 800);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const tweenGroup = new Group();
      function render() {
        tweenGroup.update(); // 更新动画
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections: any = rayCaster.intersectObjects(mesh.children);

        if (intersections.length) {
          const obj = intersections[0].object.target;

          mesh.traverse((obj: any) => {
            // obj.position.x = 0;
            // obj.position.y = 0;
            if (obj.isSprite) {
              return;
            }
            const tween = new Tween(obj.position)
              .to(
                {
                  x: 0,
                  y: 0,
                },
                500
              )
              .easing(Easing.Quadratic.InOut)
              .repeat(0)
              .onComplete(() => {
                tweenGroup.remove(tween);
              })
              .start();
            tweenGroup.add(tween);
          });

          const tween = new Tween(obj.position)
            .to(
              {
                x: 100 * Math.cos(obj.angle),
                y: 100 * Math.sin(obj.angle),
              },
              500
            )
            .easing(Easing.Quadratic.InOut)
            .repeat(0)
            .onComplete(() => {
              tweenGroup.remove(tween);
            })
            .start();
          tweenGroup.add(tween);
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

export default PieChart;
