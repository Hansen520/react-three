import { Tween } from "@tweenjs/tween.js";
import * as THREE from "three";

const group = new THREE.Group();

const textureCube = new THREE.CubeTextureLoader()
  .setPath("/city/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// 设置环境贴图，目标镜子
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512); // 参数 128 是 size，也就是 128 * 128 像素，一般设置 2 的多少次方，比如 32、64、128、256、512、1024 这种
export const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 1, // 让它变成镜子
  roughness: 0,
  envMap: cubeRenderTarget.texture, // 材质环境镜子贴图
});
const mesh = new THREE.Mesh(geometry, material);
group.add(mesh);

const geometry2 = new THREE.SphereGeometry(100);
const material2 = new THREE.MeshStandardMaterial({
  color: "lightgreen",
});
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 500);
group.add(mesh2);

let r = 800;
export const ballTween = new Tween({ angle: 0 })
  .to(
    {
      angle: Math.PI,
    },
    5000
  )
  .repeat(Infinity)
  .onUpdate((obj) => {
    // 物体二旋转
    mesh2.position.x = Math.cos(obj.angle) * r;
    mesh2.position.z = Math.sin(obj.angle) * r;
  })
  .start();

export default group;
