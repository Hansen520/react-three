import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const geometry = new THREE.TorusGeometry(300, 100);

const loader = new THREE.TextureLoader();
const texture = loader.load('/zhuan.png');
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshPhysicalMaterial({
    color: 'blue',
    sheen: 1,
    sheenRoughness: 1,
    sheenColor: 'white',
    sheenColorMap: texture, // 设置墙的纹理
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
