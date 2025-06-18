import * as THREE from 'three';

// const geometry = new THREE.CylinderGeometry( 30, 50, 1000);
// 32 是分段数，第六个参数是是否空心，设置为 true
const geometry = new THREE.CylinderGeometry( 30, 50, 1000, 32, 32, true);

const loader = new THREE.TextureLoader();
const texture = loader.load('/storm.png');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping; // 竖直方向重复，就要设置 wrapT。
texture.repeat.set(1, 2); // 设置竖直方向重复两次

const material = new THREE.MeshBasicMaterial({ 
    map: texture,
    transparent: true,
    alphaMap: texture, // 设置灰度纹理
    side: THREE.BackSide
});

const tunnel = new THREE.Mesh(geometry, material);

export default tunnel;