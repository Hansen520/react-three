/*
 * @Date: 2025-07-09 14:43:57
 * @Description: description
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";

const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: new THREE.Color("skyblue"),
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-Math.PI / 2); // 旋转90度，使其平行于地面

const boxGeometry = new THREE.BoxGeometry(50, 50, 50);
const boxMaterial = new THREE.MeshLambertMaterial({
  color: new THREE.Color("orange"),
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 300;

const mesh = new THREE.Group();
mesh.add(plane);
mesh.add(box);

const world = new CANNON.World();
world.gravity.set(0, -200, 0); // 设置重力加速度为9.8m/s^2

// 设置立方体
const boxShape = new CANNON.Box(new CANNON.Vec3(25, 25, 25));
const boxCannonMaterial = new CANNON.Material();
const boxBody = new CANNON.Body({
  shape: boxShape,
  mass: 1,
  material: boxCannonMaterial,
});
world.addBody(boxBody);

// 设置平面
const planeShape = new CANNON.Plane();
const planeCannonMaterial = new CANNON.Material();
const planeBody = new CANNON.Body({
  shape: planeShape,
  mass: 0, // 质量是 0 就是不会移动的意思，有质量的物体被碰撞可能会移动。
  material: planeCannonMaterial,
});
planeBody.position.set(0, 0, 0);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);

// 反弹的力度
const contactMaterial = new CANNON.ContactMaterial(boxCannonMaterial, planeCannonMaterial, {
  friction: 0.2, // 摩擦力
  restitution: 0.6, // 弹力
});
world.addContactMaterial(contactMaterial);

function render() {
  world.fixedStep();
  box.position.copy(boxBody.position); // 更新物体的位置
  box.quaternion.copy(boxBody.quaternion); // 更新物体的位置和旋转
  requestAnimationFrame(render);
}

render();

export default mesh;
