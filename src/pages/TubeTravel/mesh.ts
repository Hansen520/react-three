/*
 * @Date: 2025-06-16 16:10:27
 * @Description: description
 */
import * as THREE from 'three';

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60),
    new THREE.Vector3(-20, 160, 60)
]);

// 设置管道分段数 100，圆分段数 30，半径 5
const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

const loader = new THREE.TextureLoader();
const texture = loader.load('/stone.png');
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace; // 颜色更改
texture.repeat.x = 20;


const material = new THREE.MeshBasicMaterial({
    // color: new THREE.Color('orange'),
    map: texture,
    aoMap: texture, // 增加凹凸感
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

export const tubePoints = path.getSpacedPoints(1000);
console.log(tubePoints, 37);
export default mesh;
