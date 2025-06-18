/*
 * @Date: 2025-06-16 14:51:51
 * @Description: description
 */
import * as THREE from 'three';

// 这里我们用 EllipseCurve 画一条椭圆曲线，椭圆中心是 0,0，长短半轴长分别是 100、50
const arc = new THREE.EllipseCurve(0, 0, 100, 100, 0, Math.PI / 2);
// 用 getPoints 方法从中取出一些点的坐标，传入的是分段数，20 段就是 21 个点。
const pointsList = arc.getPoints(50);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList);

// const material = new THREE.PointsMaterial({
//     color: new THREE.Color('orange'),
//     size: 10
// });

// const points = new THREE.Points(geometry, material);


// console.log(points);

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange')
});

const line = new THREE.Line(geometry, material);

export default line;
