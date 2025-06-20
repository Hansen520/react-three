/*
 * @Date: 2025-06-20 15:47:32
 * @Description: description
 */
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import loadTree from "./tree";

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

const noise2D = createNoise2D();

const positions = geometry.attributes.position;

// 自定义顶点坐标，让平面产生起伏
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const y = positions.getY(i);

  // 噪音
  const z = noise2D(x / 800, y / 800) * 50;

  positions.setZ(i, z);
}

// 高低起伏
const heightArr = [];
for (let i = 0; i < positions.count; i++) {
  heightArr.push(positions.getZ(i));
}
heightArr.sort();

const minHeight = heightArr[0];
const maxHeight = heightArr[heightArr.length - 1];
const height = maxHeight - minHeight;

const colorsArr = [];
const color1 = new THREE.Color('#eee');
const color2 = new THREE.Color('white');

// 设置高低起伏的颜色值，让其更加的自然
for (let i = 0; i < positions.count; i++) {
  const percent = (positions.getZ(i) - minHeight) / height;
  // 用 color.lerp 方法，指定一个开始颜色、一个结束颜色，然后根据高度算出百分比之后，就可以算出这个百分比对应的颜色。
  // color.lerp 第二个参数是alpha
  const c = color1.clone().lerp(color2, percent);
  colorsArr.push(c.r, c.g, c.b);
}
const colors = new Float32Array(colorsArr);
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.MeshLambertMaterial({
  // color: new THREE.Color('white'),
  vertexColors: true,
  // wireframe: true
});

const mountainside = new THREE.Mesh(geometry, material);
mountainside.rotateX(-Math.PI / 2);
// 增加阴影（接收）
mountainside.receiveShadow = true;

// 加载树
loadTree((tree: any) => {
  let i = 0;
  while (i < positions.count) {
    const newTree = tree.clone();
    newTree.position.x = positions.getX(i);
    newTree.position.y = positions.getY(i);
    newTree.position.z = positions.getZ(i);
    mountainside.add(newTree);
    newTree.rotateX(Math.PI / 2);

    i += Math.floor(300 * Math.random());
  }
});

export default mountainside;
