import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const textureCube = new THREE.CubeTextureLoader()
    .setPath('/forest/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry = new THREE.SphereGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0,
    roughness: 0,
    transmission: 1, // 透明度
    envMap: textureCube,
    iridescence: 1, // 是否启用
    iridescenceIOR: 1.8, // 折射率
    reflectivity: 1, // 反射率
});



const gui = new GUI();
gui.addColor(material, 'color');
gui.add(material, 'iridescence', 0, 1);
gui.add(material, 'iridescenceIOR', 1, 2.33);
gui.add(material, 'reflectivity', 0, 1);

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
