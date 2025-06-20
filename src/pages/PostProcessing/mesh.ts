/*
 * @Date: 2025-06-19 16:25:14
 * @Description: description
 */
import * as THREE from 'three';

function createMesh(color: string, x: number) {
    // 创建一个几何体, 十二面几何体
    const geometry = new THREE.DodecahedronGeometry(100);
    const material = new THREE.MeshPhongMaterial({
        color: color
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    return mesh;    
}

const mesh = createMesh('orange', 0);
const mesh2 = createMesh('skyblue', 300);
const mesh3 = createMesh('lightgreen', -300);

const group = new THREE.Group();
group.add(mesh);
group.add(mesh2);
group.add(mesh3);

export default group;

