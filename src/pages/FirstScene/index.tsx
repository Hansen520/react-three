import { useEffect, useRef } from "react";
import * as THREE from "three";

function FirstScene() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color("orange"),
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
    }

    {
      const pointLight = new THREE.PointLight(0xffffff, 10000);
      pointLight.position.set(80, 80, 80);
      scene.add(pointLight);
    }

    {
      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      renderer.render(scene, camera);

      (mount.current as any).appendChild(renderer.domElement);
    }
  }, []);

  return (
    <div ref={mount} style={{ width: "100%", height: "100%" }} />
  );
}

export default FirstScene;
