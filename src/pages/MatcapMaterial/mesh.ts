/*
 * @Date: 2025-07-03 17:03:25
 * @Description: description
 */
import * as THREE from 'three';


const loader = new THREE.TextureLoader();
const texture = loader.load('/matcap1.png');

const geometry = new  THREE.SphereGeometry(300);
const material = new THREE.MeshMatcapMaterial({
    color: 'orange',
    matcap: texture
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
