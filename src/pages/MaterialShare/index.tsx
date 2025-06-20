/*
 * @Date: 2025-06-20 16:57:25
 * @Description: descriimport
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import loadTree from "./tree";

function MaterialShare() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    {
      // 模型也是一样可被复制的
      loadTree((tree: any) => {
        const group = new THREE.Group();

        tree.scale.set(20, 20, 20);

        const tree2 = tree.clone();
        tree2.position.x = -200;
        const tree3 = tree.clone();
        tree3.position.x = 200;

        group.add(tree, tree2, tree3);
        group.position.z = 300;
        scene.add(group);

        tree.getObjectByName("leaves001").material.color.set("green");
        tree.getObjectByName("tree001").material.color.set("brown");

        // 给复制出来的两颗树复制颜色
        tree2.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.material = obj.material.clone();
          }
        });
        tree2.getObjectByName("leaves001").material.color.set("orange");
      });

      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshLambertMaterial({
        color: "orange",
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const mesh2 = mesh.clone();
      mesh2.geometry = mesh2.geometry.clone();
      mesh2.material = mesh2.material.clone();
      mesh2.material.color.set("lightgreen");
      mesh2.position.y = 200;
      scene.add(mesh2);

      const positions = mesh2.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        positions.setX(i, positions.getX(i) * 2);
      }

      const mesh3 = mesh.clone();
      mesh3.position.x = 200;
      const mesh4 = mesh.clone();
      mesh4.position.x = -200;
      scene.add(mesh3, mesh4);
      // mesh3.material.visible = false;

      const directionLight = new THREE.DirectionalLight(0xffffff);
      directionLight.position.set(100, 100, 100);
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(350, 350, 350);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const clock = new THREE.Clock();
      function render() {
        const delta = clock.getDelta();
        mesh.rotateY(delta);
        mesh.rotateY(delta * Math.random());
        mesh.rotateX(delta * Math.random());
        mesh.rotateZ(delta * Math.random());

        // 同步旋转
        mesh2.rotation.copy(mesh.rotation);
        mesh3.rotation.copy(mesh.rotation);
        mesh4.rotation.copy(mesh.rotation);

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
          copy 是把传入的对象的值复制给当前对象，而 clone 是创建一个新的对象。
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default MaterialShare;
