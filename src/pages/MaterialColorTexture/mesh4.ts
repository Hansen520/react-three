/*
 * @Date: 2025-06-16 12:05:57
 * @Description: description
 */
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('/zhuan.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(3, 3);
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.PlaneGeometry(1000, 1000);

const material = new THREE.MeshBasicMaterial({
    map: texture,
    aoMap: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
