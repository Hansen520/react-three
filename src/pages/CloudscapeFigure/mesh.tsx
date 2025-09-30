import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three/examples/jsm/Addons.js';

const group = new THREE.Group();

// 圆1
const arc1 = new THREE.EllipseCurve(0, 0, 110, 110, 0, Math.PI * 2);

const pointsArr1 = arc1.getPoints(100);
const geometry1 = new LineGeometry();
geometry1.setFromPoints(pointsArr1);

const material1 = new LineMaterial({
    color: new THREE.Color('white'),
    linewidth: 5
});

const line1 = new Line2(geometry1, material1);
group.add(line1);

// 圆2
const arc2 = new THREE.EllipseCurve(0, 0, 120, 120, 0, Math.PI * 2);
const pointsArr2 = arc2.getPoints(50);
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr2);
const material2 = new THREE.LineBasicMaterial({
    color: new THREE.Color('white')
});
const line2 = new THREE.Line(geometry2, material2);
group.add(line2);

const circleGroup = new THREE.Group();
for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
    console.log(angle, 34)
    const R = 130; // 半径，此是坐标轴原点的半径
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const arc = new THREE.EllipseCurve(x, y, 10, 10, 0, Math.PI * 2); // 确定中心点，半径10，角度360度
    const pointsArr = arc.getPoints(50); // 确定点数,50个点比较密集比较好
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(pointsArr);
    const material = new THREE.LineBasicMaterial({
        color: new THREE.Color('white')
    })
    const line = new THREE.Line(geometry, material);
    circleGroup.add(line);
}
group.add(circleGroup);

const arc3 = new THREE.EllipseCurve(0, 0, 142.5, 142.5, 0, Math.PI * 2); // 因为线宽 5，那半径就要额外加 2.5 即142.5，不然线会和圆重叠
const pointsArr3 = arc3.getPoints(50);
const geometry3 = new LineGeometry();
geometry3.setFromPoints(pointsArr3);
const material3 = new LineMaterial({
    color: new THREE.Color('white'),
    linewidth: 5
})
const line3 = new Line2(geometry3, material3);
group.add(line3);

const figureGroup = new THREE.Group();
for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 10) {
    const R = 200;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);

    const pointsArr = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(20, -10, 0),
        new THREE.Vector3(20, 20, 0),
        new THREE.Vector3(-20, 20, 0),
        new THREE.Vector3(-20, -20, 0),
        new THREE.Vector3(20, -20, 0)
    ]; // 确定10个点

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(pointsArr);
    const material = new THREE.LineBasicMaterial({ color: new THREE.Color('white') });

    const line = new THREE.Line(geometry, material);

    line.position.set(x, y, 0); // 设置位置
    line.rotation.z = angle; // 旋转角度

    figureGroup.add(line);
}
group.add(figureGroup);

// 再画一圈大的
const figureGroup2 = new THREE.Group();
for(let angle = 0; angle < Math.PI  * 2; angle += Math.PI  / 10) {
    const R = 260;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);

    const pointsArr = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(15, 0, 0),
        new THREE.Vector3(15, 15, 0),
        new THREE.Vector3(-15, 15, 0),
        new THREE.Vector3(-15, -15, 0),
        new THREE.Vector3(30, -15, 0),
        new THREE.Vector3(30, 30, 0),
        new THREE.Vector3(-30, 30, 0),
        new THREE.Vector3(-30, -30, 0),
        new THREE.Vector3(30, -30, 0)
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(pointsArr);
    const material = new THREE.LineBasicMaterial({
        color: new THREE.Color('white')
    });
    const line = new THREE.Line(geometry, material);
    
    line.position.set(x, y, 0);    
    line.rotation.z = angle;
    
    figureGroup2.add(line);
}
group.add(figureGroup2);

export default group;