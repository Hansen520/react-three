import * as THREE from 'three';

const textureCube = new THREE.CubeTextureLoader()
    .setPath('/forest/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry = new THREE.CylinderGeometry(200, 200, 500);
const material = new THREE.MeshStandardMaterial({
    color: 'orange',
    roughness: 0, // 设置为 0 就是完全光滑的镜面
    metalness: 1, // 1 就是完全的金属效果
    envMap: textureCube,
    envMapIntensity: 1 // 这个是受环境影响的强度，一般设置 1 就行
});
const mesh = new THREE.Mesh(geometry, material);



export default mesh