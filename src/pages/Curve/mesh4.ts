/*
 * @Date: 2025-06-16 15:09:01
 * @Description: description
 */
import * as THREE from 'three';

const p1 = new THREE.Vector3(-100, 0, 0);
// 用 CubicBezierCurve3 这个 API，传入 4 个点，中间两个是控制点。
const p2 = new THREE.Vector3(50, 100, 0);
const p3 = new THREE.Vector3(100, 0, 100);
const p4 = new THREE.Vector3(100, 0, 0);

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
const pointsArr = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({ 
    color: new THREE.Color('orange')
});

const line = new THREE.Line( geometry, material );

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1,p2,p3,p4]);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('pink'),
    size: 5
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
line.add(points2, line2);

export default line;
