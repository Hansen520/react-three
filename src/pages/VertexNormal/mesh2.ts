/*
 * @Date: 2025-06-18 10:40:13
 * @Description: description
 */
import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    100, 100, -100
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

// 设置顶点索引
const indexes = new Uint16Array([
    0, 1, 2, 2, 1, 3
]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    1, 1, 0
]);
// 设置法线, 法线是相对于顶点而言的, 所以法线数量和顶点数量相同, 每个顶点对应一个法线, 法线是三维向量, 所以法线数量是3的倍数
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange'),
    // shininess: 1000
});

const mesh = new THREE.Mesh(geometry, material);



export default mesh;
