/*
 * @Date: 2025-06-23 15:46:44
 * @Description: description
 */
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';

const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue')
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(- Math.PI / 2);
plane.position.y = -50;

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const boxMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

const box2 = box.clone();
box2.position.x = 200;

const mesh = new THREE.Group();
mesh.add(plane);
mesh.add(box);
mesh.add(box2);

const ele = document.createElement('div');
ele.innerHTML = '<p style="background:#fff;padding: 10px;">这是 要标注的物体上加一个 CSS2DObject，传入 dom 元素，这样就会在那里展示一个标注</p>';
const obj = new CSS2DObject(ele);
obj.position.y = 100;
box.add(obj);
// 设置点击的时候再显示
obj.name = 'tag';
obj.visible = false;

const ele2 = document.createElement('div');
ele2.innerHTML = '<p style="background:#fff;padding: 10px;">这是 box2</p>';
const obj2 = new CSS2DObject(ele2);
obj2.position.y = 100;
box2.add(obj2);
// 设置点击的时候再显示
obj2.name = 'tag';
obj2.visible = false;

export default mesh;
