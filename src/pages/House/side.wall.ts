/*
 * @Date: 2025-06-16 16:57:40
 * @Description: description
 */
import * as THREE from 'three';

// 画墙
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 2000);
shape.lineTo(-1500, 3000);
shape.lineTo(-3000, 2000);
shape.lineTo(-3000, 0);

// 画窗户
const windowPath = new THREE.Path();
windowPath.moveTo(-600, 400);
windowPath.lineTo(-600, 1600);
windowPath.lineTo(-2400, 1600);
windowPath.lineTo(-2400, 400);
shape.holes.push(windowPath);

const loader = new THREE.TextureLoader();
const texture = loader.load('/houseZhuan.png');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// 因为它是拉伸出来的，不像内置的几何体比如 BoxGeometry 那样有设置好的 uv 坐标。
// 所以需要手动设置一下，这里设置成 0.0005 是因为 1 个单位在场景中相当于 1 米，所以 1 个单位在纹理中相当于 0.0005 米。
// 设置的 0.0005，它乘以 2000 是不是正好是 1
texture.repeat.x = 0.0005;
texture.repeat.y = 0.0005

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
});
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgrey')
    map: texture,
    aoMap: texture,
});

const sideWall = new THREE.Mesh(geometry, material);



export default sideWall