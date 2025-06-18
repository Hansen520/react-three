/*
 * @Date: 2025-06-16 16:27:15
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";

function InfiniteTunnel() {
  const mount = useRef<HTMLDivElement>(null);
    const scene = new THREE.Scene();
  
    useEffect(() => {
      {
        scene.add(mesh);
  
        const directionLight = new THREE.DirectionalLight(0xffffff);
        directionLight.position.set(100, 100, 100);
        scene.add(directionLight);
  
        const ambientLight = new THREE.AmbientLight();
        scene.add(ambientLight);
  
        const axesHelper = new THREE.AxesHelper(200);
        // scene.add(axesHelper);
  
        const width = mount.current!.clientWidth;
        const height = mount.current!.clientHeight;
  
        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
        camera.position.set(0.9, -520, 6.5);
        camera.lookAt(0, 0, 0);
  
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
  
        let H = 0;
        let S = 0;
        const clock = new THREE.Clock();
        function render() {
          // mesh.material.map!.offset.y += 0.01;

          H += 0.002;
          if (H > 1) {
            H = 0;
          }

          S += 0.001;
          if (S > 1) {
            S = 0;
          }
          
          // 通过改色相值，更加显示真实的效果， hsl 就是色相、饱和度、亮度，它是颜色的一种表示方法。
          mesh.material.color.setHSL(H, S, 0.5);

          // 通过时钟改变数值
          const delta = clock.getDelta();
          mesh.material.alphaMap!.offset.y += delta * 0.5;
          mesh.rotation.y += delta * 0.5;

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
        <div ref={mount} style={{ width: "100%", height: "100%" }} />
      </>
    );
}

export default InfiniteTunnel;
