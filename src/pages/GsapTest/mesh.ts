import * as THREE from 'three';
import gsap from 'gsap';

const geometry = new THREE.BoxGeometry(30, 30, 30);
const material = new THREE.MeshPhongMaterial({
    color: 'orange'
});

const mesh = new THREE.Mesh(geometry, material);



gsap.to(mesh.position, {
    x: 300,
    ease: 'bounce.inOut'
}).repeat(0);

export default mesh;