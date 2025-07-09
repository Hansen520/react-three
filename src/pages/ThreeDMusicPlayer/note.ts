/*
 * @Date: 2025-07-09 10:40:02
 * @Description: description
 */
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { Easing, Group, Tween } from "@tweenjs/tween.js";
import { throttle } from "lodash-es";

function createCanvas() {
  const dpr = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const w = (canvas.width = 300 * dpr);
  const h = (canvas.height = 300 * dpr);
  const ctx = canvas.getContext("2d");
  ctx!.translate(w / 2, h / 2);
  //   ctx!.moveTo(-50 * dpr, -10 * dpr);
  //   ctx!.lineTo(50 * dpr, -10 * dpr);
  //   ctx!.lineTo(-30 * dpr, 50 * dpr);
  //   ctx!.lineTo(0 * dpr, -50 * dpr);
  //   ctx!.lineTo(30 * dpr, 50 * dpr);
  //   ctx!.lineTo(-50 * dpr, -10 * dpr);
  //   ctx!.lineTo(-50 * dpr, -10 * dpr);
  //   ctx!.fillStyle = "yellow";
  //   ctx!.fill();

  ctx!.moveTo(-20 * dpr, 40 * dpr);
  ctx!.lineTo(-20 * dpr, -10 * dpr);
  ctx!.lineTo(20 * dpr, -10 * dpr);
  ctx!.lineTo(20 * dpr, 30 * dpr);

  ctx!.lineWidth = 10;
  ctx!.lineJoin = "round";
  ctx!.strokeStyle = "yellow";
  ctx!.stroke();

  ctx!.beginPath();
  // 画椭圆形 x、y，长短半轴长，旋转角度，开始结束角度
  ctx!.ellipse(25, 20, 15, 20, Math.PI / 2, 0, Math.PI *2);
  ctx!.fillStyle = "yellow";
  ctx!.fill();

  ctx!.beginPath();
  ctx!.ellipse(-14, 46, 15, 20, Math.PI / 2, 0, Math.PI * 2);
  ctx!.fill();

  return canvas;
}

function createNote() {
  const texture = new THREE.CanvasTexture(createCanvas());
  const material = new THREE.SpriteMaterial({
    map: texture,
  });
  const note: any = new THREE.Sprite(material);
  note.scale.set(100, 100);
  return note;
}
const group = new THREE.Group();

for (let i = 0; i < 100; i++) {
  const note = createNote();

  const x = -1000 + 2000 * Math.random();
  const y = -1000 + 2000 * Math.random();
  const z = -2000 + 4000 * Math.random();
  note.position.set(x, y, z);

  group.add(note);
}
// 音符运动
const simplex = new SimplexNoise();
const tweenGroup = new Group();
let time = 0;
function updatePosition() {
  group.children.forEach((sprite) => {
    const { x, y, z } = sprite.position;
    const x2 = x + simplex.noise(x, time) * 100;
    const y2 = y + simplex.noise(y, time) * 100;
    const z2 = z + simplex.noise(z, time) * 100;
    const tween = new Tween(sprite.position)
      .to(
        {
          x: x2,
          y: y2,
          z: z2,
        },
        500
      )
      .easing(Easing.Quadratic.InOut)
      .repeat(0)
      .start()
      .onComplete(() => {
        tweenGroup.remove(tween);
      });
    tweenGroup.add(tween);

    // sprite.position.set(x2, y2, z2);
  });
  time++;
}
const updatePosition2 = throttle(updatePosition, 500);
function render() {
  tweenGroup.update();
  updatePosition2();
  requestAnimationFrame(render);
}
render();

export default group;
// const note = createNote();

// export default note;
