import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

const positions = geometry.attributes.position;

// 这就是噪音算法，生成的是与位置有关系的连续的随机数
const noise2D = createNoise2D();

for (let i = 0 ; i < positions.count; i ++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;
    positions.setZ(i, z);
}


const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);



export function updatePosition() {
    const positions = geometry.attributes.position;

    for (let i = 0 ; i < positions.count; i ++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        const z = noise2D(x / 300, y / 300) * 50;
        // 然后想让它起伏，需要用正弦函数，然后以时间作为参数再加上顶点 x 或 z 坐标，这样每个顶点就会随时间做正弦规律的起伏。
        const sinNum = Math.sin(Date.now() * 0.002  + z * 0.05) * 10;

        positions.setZ(i, z + sinNum);
    }
    positions.needsUpdate = true;
}

export default mesh;

