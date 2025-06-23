/*
 * @Date: 2025-06-23 10:46:15
 * @Description: tween动画
 */
import * as THREE from 'three';

const geometry = new  THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshPhongMaterial({
    color: 'orange'
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;