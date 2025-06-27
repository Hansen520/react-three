/*
 * @Date: 2025-06-27 15:27:44
 * @Description: description
 */
import * as THREE from 'three';

function createCanvas(text: string, width: number) {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio;
    const w = canvas.width = width * dpr;
    const h = canvas.height = 50 * dpr;

    const c = canvas.getContext('2d');
    c!.translate(w / 2, h / 2);
    c!.fillStyle = "#ffffff";
    c!.font = "normal 30px 微软雅黑";
    c!.textBaseline = "middle";
    c!.textAlign = "center";
    c!.fillText(text, 0, 0);
    return canvas;
}

export default function createLabel(text: string) {
    const texture = new THREE.CanvasTexture(createCanvas(text, text.length * 30));

    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture
    });

    const label: any = new THREE.Sprite(spriteMaterial);
    label.scale.set(text.length * 30, 50);
    return label;
}