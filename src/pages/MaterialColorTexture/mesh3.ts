/*
 * @Date: 2025-06-16 11:25:29
 * @Description: description
 */
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('/diqiu.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(100);

const material = new THREE.MeshBasicMaterial({
    // color: new THREE.Color('orange'),
    map: texture,
    // aoMap: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;