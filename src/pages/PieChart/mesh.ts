/*
 * @Date: 2025-06-24 11:27:55
 * @Description: description
 */
import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/Addons.js';

const curvePath = new THREE.CurvePath();

const v1 = new THREE.Vector2(0, 0);
const v2 = new THREE.Vector2(0, 300);
const v3 = new THREE.Vector2(300, 0);

// 两条线加上一个弧线就是一个扇形，加上深度就是一个扇形柱体
const line1 = new THREE.LineCurve(v1, v3);
curvePath.add(line1);

const arc = new THREE.EllipseCurve(0, 0, 300, 300, 0, Math.PI / 2);
curvePath.add(arc);

const line2 = new THREE.LineCurve(v1, v2);
curvePath.add(line2);

const points: any = curvePath.getPoints(100);
const shape = new THREE.Shape(points);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
})
const material = new THREE.MeshPhongMaterial({
    color: 'orange'
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
