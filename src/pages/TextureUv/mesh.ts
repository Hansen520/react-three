/*
 * @Date: 2025-06-16 14:28:18
 * @Description: description
 */
import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(200, 100);

const uvs = new Float32Array([
    0, 0.5,
    0.5, 0.5,
    // 如果将上下两组数据互换，则图片会上下颠倒
    0, 0,
    0.5, 0,
    
]);

geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2);

const loader = new THREE.TextureLoader();
const texture = loader.load('/bg.png');
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial(({
    map: texture
}));

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;
