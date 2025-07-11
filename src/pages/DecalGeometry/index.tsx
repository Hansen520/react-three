/*
 * @Date: 2025-07-10 11:24:32
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { DecalGeometry } from "three/examples/jsm/Addons.js";
// import mesh2 from "./mesh2";

function _DecalGeometry() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(500, 600, 400);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);

      const loader = new THREE.TextureLoader();
      const texture = loader.load("./xiaoxin.png");
      texture.colorSpace = THREE.SRGBColorSpace;

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections: any = rayCaster.intersectObjects(mesh.children);

        if (intersections.length) {
          console.log(intersections);
          const position = intersections[0].point;
          console.log(position);

          const orientation = new THREE.Euler();
          const size = new THREE.Vector3(100, 100, 100);
          // 鼠标点击后贴图
          const geometry1 = new DecalGeometry(intersections[0].object, position, orientation, size);
          const material1 = new THREE.MeshPhongMaterial({
            polygonOffset: true,
            polygonOffsetFactor: -4,
            map: texture,
            transparent: true,
          });
          const mesh1 = new THREE.Mesh(geometry1, material1);
          scene.add(mesh1);
        }
      });

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

export default _DecalGeometry;
