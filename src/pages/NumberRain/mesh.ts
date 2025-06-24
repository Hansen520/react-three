import * as THREE from "three";
import SpriteText from "three-spritetext";

const width = window.innerWidth;
const height = window.innerHeight;

const columnWidth = 50;
const columnNum = Math.floor(width / columnWidth);

const fontSize = 30;
const lineHeight = fontSize * 1.3;

const textNumOfColumn = Math.ceil((height * 2) / lineHeight);

const group = new THREE.Group();
const columns: any[] = [];

const textArr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < columnNum; i++) {
  const column = [];

  for (let j = 0; j < textNumOfColumn; j++) {
    const text = textArr[Math.floor(Math.random() * textArr.length)];

    const spriteText = new SpriteText(text, 14, "green");
    spriteText.strokeWidth = 1;
    spriteText.strokeColor = "lightblue";

    const x = i * columnWidth;
    const y = j * lineHeight + Math.random() * 60;
    spriteText.position.set(x, y, 0);
    spriteText.material.opacity = 0.5 + 0.5 * Math.random();

    group.add(spriteText);
    column.push(spriteText);
  }
  columns.push(column);

  function animate() {
    columns.forEach((column, index) => {
      column.forEach((sprite: any) => {
        if (index % 3 == 0) {
          sprite.position.y -= 0.01 + 0.01 * Math.random();
        } else if (index % 3 == 1) {
          sprite.position.y -= 0.02 + 0.02 * Math.random();
        } else if (index % 3 == 2) {
          sprite.position.y -= 0.03 + 0.03 * Math.random();
        }

        if (sprite.position.y < 0) {
          sprite.position.y = height;
        }
      });
    });
    requestAnimationFrame(animate);
  }
  animate();
}

export default group;
