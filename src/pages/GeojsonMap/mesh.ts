import * as THREE from 'three';
import { geoMercator } from 'd3-geo';

const chinaMap = new THREE.Group();

// d3-geo 的 geoMercator 来做墨卡托转换。
const mercator = geoMercator()
    // center 设置地图的中心点
    .center([105,34]).translate([0, 0]).scale(800)

// const shape = new THREE.Shape();
// shape.moveTo(100, 10);
// shape.lineTo(10, 40);
// shape.lineTo(30, 80);
// shape.lineTo(60, 40)
// shape.lineTo(80, 100);

// const geometry = new THREE.ShapeGeometry(shape);

// const material = new THREE.MeshLambertMaterial({
//     color: new THREE.Color('lightgreen')
// });

// const mesh = new THREE.Mesh(geometry, material);


const loader = new THREE.FileLoader();
loader.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', (data: any) => {
    const geojson = JSON.parse(data);
    console.log(geojson);

    geojson.features.forEach((feature: any) => {
        const province = new THREE.Group();

        // 如果是单个多边形，那就直接拿到经纬度坐标数据。
        if (feature.geometry.type === 'Polygon') {
            const polygon = createPolygon(feature.geometry.coordinates[0]);
            province.add(polygon);

            // 如果是多个多边形，那再加个循环就好了。
        } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach((polygonCoords: any) => {
                const polygon = createPolygon(polygonCoords);
                province.add(polygon);
            });
        }

        chinaMap.add(province);
    })
})

function createPolygon(coordinates: any) {
    const group = new THREE.Group();
    
    coordinates.forEach((item: any) => {
        const bufferGeometry = new THREE.BufferGeometry();
        const vertices: any = [];
        item.forEach((point: any) => {
            const [x, y] = mercator(point) as any;
            vertices.push(x, -y, 0);
        });
        const attribute = new THREE.Float32BufferAttribute(vertices, 3);;
        bufferGeometry.attributes.position = attribute;

        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 'white' 
        });
        // 和前面一样，BufferGeometry + Line 来画线模型。
        const line = new THREE.Line(bufferGeometry, lineMaterial);
        group.add(line);
    });

    return group;
}

export default chinaMap;
