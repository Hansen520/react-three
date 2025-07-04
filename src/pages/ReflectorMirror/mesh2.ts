/*
 * @Date: 2025-07-04 14:39:19
 * @Description: description
 */
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/Addons.js";

const group = new THREE.Group();

function createMirror(name: string, z: number, rotationY: number) {
  const geometry = new THREE.PlaneGeometry(1000, 1000);
  const mesh = new Reflector(geometry, {
    textureWidth: window.innerWidth * window.devicePixelRatio, // 变得清晰点
    textureHeight: window.innerHeight * window.devicePixelRatio,
  }); // Reflector，他是专门用来做镜面效果的，不用指定材质
  mesh.name = name;
  mesh.position.z = z;
  mesh.rotateY(rotationY);
  return mesh;
}

function createBall() {
  const geometry = new THREE.SphereGeometry(100);
  const material = new THREE.MeshStandardMaterial({
    color: "lightgreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
group.add(createMirror("mirror1", -500, 0));
group.add(createMirror("mirror2", 500, Math.PI));
group.add(createBall());

export default group;
