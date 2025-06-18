/*
 * @Date: 2025-06-16 16:55:30
 * @Description: description
 */
import * as THREE from 'three';
import foundation from './foundation';
import sideWall from './side.wall';
import behindWall from './behind-wall';
import frontWall from './front-wall';
import roof from './roof';
import doorstep from './doorstep';
import chimney from './chimney';

const house = new THREE.Group();

// 克隆
const sideWall2 = sideWall.clone();

sideWall.rotateY(Math.PI / 2);
sideWall.translateZ(-2000);
sideWall.translateX(1500);
sideWall.translateY(150);

sideWall2.rotateY(Math.PI / 2);
sideWall2.translateZ(1900);
sideWall2.translateX(1500);
sideWall2.translateY(150);

const roof2 = roof.clone();
roof2.rotateX(70 / 180 * Math.PI);
roof2.position.z = -roof.position.z;

house.add(foundation);
house.add(sideWall);
house.add(sideWall2);
house.add(behindWall);
house.add(frontWall);
house.add(roof);
house.add(roof2);
house.add(doorstep);
house.add(chimney);

export default house;