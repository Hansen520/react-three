import * as THREE from 'three';
import { geoMercator } from 'd3-geo';

const chinaMap = new THREE.Group();

const mercator = geoMercator()
    .center([105,34]).translate([0, 0]).scale(600)

const loader = new THREE.FileLoader();
loader.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', function (data: any) {
    const geojson = JSON.parse(data);
    console.log(geojson);

    geojson.features.forEach((feature: any) => {
        const province = new THREE.Group();
        
        if (feature.geometry.type === 'Polygon') {
            const polygon = createPolygon(feature.geometry.coordinates);
            province.add(polygon);
        } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach((polygonCoords: any) => {
                const polygon = createPolygon(polygonCoords);
                province.add(polygon);
            });
        }

        chinaMap.add(province);
    });
});

function createPolygon(coordinates: any) {
    const group = new THREE.Group();
    
    coordinates.forEach((item: any) => {
        const bufferGeometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        item.forEach((point: any) => {
            const [x, y] = mercator(point) as any;
            vertices.push(x, -y, 0);
        });
        const attribute = new THREE.Float32BufferAttribute(vertices, 3);;
        bufferGeometry.attributes.position = attribute;

        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 'white' 
        });
        const line = new THREE.Line(bufferGeometry, lineMaterial);
        group.add(line);
    });

    return group;
}

export default chinaMap;
