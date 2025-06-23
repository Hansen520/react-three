import TWEEN from "three/examples/jsm/libs/tween.module.js";
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(30, 30, 30);
const material = new THREE.MeshPhongMaterial({
    color: 'orange'
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;