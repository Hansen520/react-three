/*
 * @Date: 2025-06-23 17:28:45
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();

function createCanvas() {
    const dpr = window.devicePixelRatio;
    const canvas = document.createElement('canvas');
    const w = canvas.width = 100 * dpr;
    const h = canvas.height = 100 * dpr;

    const ctx = canvas.getContext('2d');
    // translate to center
    ctx?.translate(w / 2, h / 2);
    ctx?.arc(0, 0, 40 * dpr, 0, Math.PI * 2);
    ctx!.fillStyle = "orange";
    ctx!.fill();

    ctx!.beginPath();
    ctx!.moveTo(-10 * dpr, -20 * dpr);
    ctx!.lineTo(-10 * dpr, 20 * dpr);
    ctx!.lineTo(20 * dpr, 0);
    ctx?.closePath();
    ctx!.fillStyle = "white";
    ctx!.fill();
    return canvas;
}



function createPlane(x: number, y: number) {
    // 利用自绘canvas做贴图
    const texture = new THREE.CanvasTexture(createCanvas());
    texture.colorSpace = THREE.SRGBColorSpace;
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshPhongMaterial({
        // color: 'white'
        map: texture
    });
    const mesh =  new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    return mesh;
}

group.add(createPlane(-300, 0));
group.add(createPlane(0, 0));
group.add(createPlane(300, 0));

export default group;
