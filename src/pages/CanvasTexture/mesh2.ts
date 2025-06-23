/*
 * @Date: 2025-06-23 17:28:45
 * @Description: description
 */
import * as THREE from 'three';

const group = new THREE.Group();



function createCanvas2() {
    const dpr = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    const w = canvas.width = 100 * dpr;
    const h = canvas.height = 100 * dpr;

    const ctx = canvas.getContext('2d');
    // ctx?.translate(w / 2, h / 2);
    
    ctx!.moveTo(30 * dpr,20 * dpr);
    ctx!.beginPath();
    ctx!.lineTo(50 * dpr,0);
    ctx!.lineTo(70 * dpr,20 * dpr);
    ctx!.lineTo(100 * dpr,30 * dpr);
    ctx!.lineTo(85 * dpr,60 * dpr);
    ctx!.lineTo(80 * dpr,90 * dpr);
    ctx!.lineTo(50 * dpr,80 * dpr);
    ctx!.lineTo(20 * dpr,90 * dpr);
    ctx!.lineTo(15 * dpr,60 * dpr);
    ctx!.lineTo(0,30 * dpr);
    ctx!.lineTo(30 * dpr,20 * dpr);
    ctx!.closePath();
    ctx!.fillStyle = "red";
    ctx!.fill();
    return canvas;	
}


function createPlane(x: number, y: number) {
    // 利用自绘canvas做贴图
    const texture = new THREE.CanvasTexture(createCanvas2());
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
