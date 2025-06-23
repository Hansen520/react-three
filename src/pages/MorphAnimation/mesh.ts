/*
 * @Date: 2025-06-23 14:18:43
 * @Description: description
 */
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(300, 300, 300);
const material = new  THREE.MeshLambertMaterial({
    color: 'orange'
});

const positions = geometry.attributes.position.clone();

for (let i = 0; i < positions.count; i++) {
    // 这个是变形目标
    positions.setY(i, positions.getY(i) * 2);
}

const positions2 = geometry.attributes.position.clone();
for (let i = 0; i < positions2.count; i++) {
    // 这个是变形目标
    positions2.setX(i, positions2.getX(i) * 2);
}

geometry.morphAttributes.position = [positions, positions2];

const mesh: any = new THREE.Mesh(geometry, material);

// 变形因子，0-1
// mesh!.morphTargetInfluences[0] = 1;
// mesh!.morphTargetInfluences[1] = 0;

export default mesh;