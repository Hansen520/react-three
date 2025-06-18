/*
 * @Date: 2025-06-17 10:48:35
 * @Description: description
 */
import * as THREE from 'three';

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(300, 0);
shape.lineTo(300, 200);
shape.lineTo(0, 200);

const loader = new THREE.TextureLoader();
const texture = loader.load('/houseZhuan.png');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 0.0005;
texture.repeat.y = 0.0005

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 500
});
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgrey')
    map: texture,
    aoMap: texture,
});

const chimney = new THREE.Mesh(geometry, material);
chimney.rotateX(-Math.PI / 2);
chimney.translateZ(2650);
chimney.translateX(1100);
chimney.translateY(-800);
export default chimney;