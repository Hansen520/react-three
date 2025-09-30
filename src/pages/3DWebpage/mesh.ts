import * as THREE from 'three';
import flower from './flower';

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
    color: 'orange'
});
const mesh = new THREE.Mesh(geometry, material);

group.add(mesh);


const geometry2 = new THREE.DodecahedronGeometry(100);
const material2 = new THREE.MeshLambertMaterial({
    color: 'lightblue'
});
const mesh2 = new THREE.Mesh(geometry2, material2);
group.add(mesh2);
mesh2.position.set(0, -500, 0);

const geometry3 = new THREE.SphereGeometry(100);
const material3 = new THREE.MeshLambertMaterial({
    color: 'lightgreen'
});
const mesh3 = new THREE.Mesh(geometry3, material3);
group.add(mesh3);
mesh3.position.set(0, -1000, 0);

group.add(flower);
flower.position.set(0, -1600, 0);

export default group;

