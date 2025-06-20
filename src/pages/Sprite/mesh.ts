/*
 * @Date: 2025-06-20 15:09:46
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();

const spriteMaterial = new THREE.SpriteMaterial({
    color: 'orange'
});

// 可以用它来做一些图标啊等标注
const sprite = new THREE.Sprite(spriteMaterial);

group.add(sprite);

export default group;