import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const point1 = new THREE.Vector3(0, 0, 0);
const point2 = new THREE.Vector3(0, 100, 0);
const point3 = new THREE.Vector3(100, 0, 0);
geometry.setFromPoints([point1, point2, point3]);

const colors = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);
// 3个顶点，每个顶点3个颜色值
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.MeshBasicMaterial({
    vertexColors:true,
    // size: 30,
});

const points = new THREE.Mesh(geometry, material);

export default points;
