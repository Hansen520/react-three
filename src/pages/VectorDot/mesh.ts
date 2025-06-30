/*
 * @Date: 2025-06-30 09:31:03
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();

const origin = new THREE.Vector3(0, 0, 0);
const dir = new THREE.Vector3(1, 0, 0);
dir.normalize();

const ArrowHelper = new THREE.ArrowHelper(dir, origin, 4, 'red');
group.add(ArrowHelper);

const dir2 = new THREE.Vector3(-1, 2, 0);
dir2.normalize();

const ArrowHelper2 = new THREE.ArrowHelper(dir2, origin, 400, 'blue');

group.add(ArrowHelper2);

export default group;