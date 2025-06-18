/*
 * @Date: 2025-06-16 15:10:33
 * @Description: description
 */
import * as THREE from 'three';

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(100, 100);
const line1 = new THREE.LineCurve(p1, p2);

const arc = new THREE.EllipseCurve(0, 100, 100, 100, 0, Math.PI);

const p3 = new THREE.Vector2(-100, 100);
const p4 = new THREE.Vector2(0, 0);
const line2 = new THREE.LineCurve(p3, p4);

// 我们创建了两条直线 LineCure、一个椭圆曲线 EllipseCurve
// 用曲线路径 CurvePath 把它们组合起来。
const curvePath = new THREE.CurvePath();
curvePath.add(line1);
curvePath.add(arc);
curvePath.add(line2);

const pointsArr = curvePath.getPoints(20);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr as any[]);

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('pink')
});

const line = new THREE.Line(geometry, material);

export default line;
