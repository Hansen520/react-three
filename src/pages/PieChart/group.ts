/*
 * @Date: 2025-06-27 15:25:39
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();

const R = 300;
function createPieChart(data: any[]) {
    let total = 0;
    data.forEach((item) => {
        total += item.value;
    });
    const angles = data.map((item) => {
        return item.value / total * R;
    });
    console.log(angles);
};

const data = [
    {
        name: '春节销售额',
        value: 1000
    },
    {
        name: '夏节销售额',
        value: 3000
    },
    {
        name: '秋节销售额',
        value: 800
    },
    {
        name: '冬节销售额',
        value: 500
    }
];

createPieChart(data);

export default group;