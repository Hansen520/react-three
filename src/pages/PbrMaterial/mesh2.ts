/*
 * @Date: 2025-07-03 16:04:59
 * @Description: description
 */
import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const textureCube = new THREE.CubeTextureLoader()
    .setPath('/forest/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry = new THREE.DodecahedronGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
    color: 'blue',
    metalness: 0, // 金属度
    roughness: 0, // 光滑的玻璃粗糙度 roughness
    envMap:textureCube,
    transmission: 0.9, // 透光率
    ior: 1.8, // ior 折射率范围是 0 到 2.33
});

const gui = new GUI();
gui.addColor(material, 'color');
gui.add(material, 'transmission', 0, 1);
gui.add(material, 'ior', 0, 2.33);

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
