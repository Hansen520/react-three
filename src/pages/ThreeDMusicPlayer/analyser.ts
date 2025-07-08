/*
 * @Date: 2025-07-08 17:32:35
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();

const color1 = new THREE.Color('yellow');
const color2 = new THREE.Color('blue');

for(let i = 1; i <= 21; i ++) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, i * 50, 0, Math.PI * 2);
    
    const path = new THREE.Path();
    path.absarc(0, 0, i * 50 - 20, 0, Math.PI * 2);
    
    shape.holes.push(path);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 300,
        curveSegments: 50
    });

    // 放渐变颜色
    const percent = i / 21;
    const color = color1.clone().lerp(color2, percent);

    const material = new THREE.MeshPhysicalMaterial({
        // color: new THREE.Color('lightgreen')
        color
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
}

group.rotateX(- Math.PI / 2);

export default group;

// const shape = new THREE.Shape();
// shape.absarc(0, 0, 200, 0, Math.PI * 2);

// const path = new THREE.Path();
// // 150为半径
// path.absarc(0, 0, 150, 0, Math.PI * 2);

// shape.holes.push(path);

// const geometry = new THREE.ExtrudeGeometry(shape, {
//     depth: 300,
//     curveSegments: 50
// });
// const material = new THREE.MeshPhysicalMaterial({
//     color: new THREE.Color('lightgreen')
// });

// const mesh = new THREE.Mesh(geometry, material);
// mesh.rotateX(- Math.PI / 2);

// export default mesh;