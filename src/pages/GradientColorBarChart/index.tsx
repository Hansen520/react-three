/*
 * @Date: 2025-06-18 11:25:05
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";

function GradientColorBarChart() {
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
  
        const axesHelper = new THREE.AxesHelper(500);
        // scene.add(axesHelper);
  
        const width = mount.current!.clientWidth;
        const height = mount.current!.clientHeight;
  
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(30, 0, 240);
        camera.lookAt(0, 0, 0);
  
        const renderer = new THREE.WebGLRenderer({
          logarithmicDepthBuffer: true,
          antialias: true,
        });
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
        <div ref={mount} style={{ width: "100%", height: "100%" }} />
      </>
    );
}

export default GradientColorBarChart;
