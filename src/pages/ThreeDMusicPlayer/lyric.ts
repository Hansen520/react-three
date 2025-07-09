/*
 * @Date: 2025-07-08 17:51:27
 * @Description: description
 */
import * as THREE from "three";

const lyricList = new THREE.Group();

function createCanvas(text: string, width: number) {
  const dpr = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const w = (canvas.width = width * dpr);
  const h = (canvas.height = 100 * dpr);

  const c = canvas.getContext("2d");
  c!.translate(w / 2, h / 2);
  c!.fillStyle = "#ffffff";
  c!.font = "normal 24px 微软雅黑";
  c!.textBaseline = "middle";
  c!.textAlign = "center";
  c!.fillText(text, 0, 0);

  return canvas;
}

function createLyricItem(text: string) {
  const texture = new THREE.CanvasTexture(createCanvas(text, text.length * 30));
  const g = new THREE.PlaneGeometry(text.length * 300, 500);
  const m = new THREE.MeshPhysicalMaterial({
    map: texture,
    transparent: true,
    roughness: 0.3,
  });
  const plane = new THREE.Mesh(g, m);
  plane.position.y = 41;
  return plane;
}

export const lyricPositions: any[] = [];
fetch('/audio-api_public_superman.lrc').then((res) => {
    return res.text()
}).then(content => {
    // console.log(content);
    const lyrics = content.split('\n');
    lyrics.forEach((lyric, i) => {
        
        const timeStr = lyric.slice(0, 10);
        if (timeStr.length) {
            // 获取时分秒
            const minute = parseInt(timeStr.slice(1, 3));
            const second = parseFloat(timeStr.slice(4, 10));
            const mSecond = parseInt(timeStr.slice(7, 9));

            const time = minute * 60 * 1000 + second * 1000 + mSecond;
            lyricPositions[i] = [time, i * 1000];
        }

        // console.log(lyricPositions, 57);

        const lyricItem = createLyricItem(lyric.slice(10));
        lyricList.add(lyricItem);
        lyricItem.position.z = -lyrics.indexOf(lyric) * 1000;
    })
})

// const lyricItem = createLyricItem("你好，我是 superman");
// lyricList.add(lyricItem);
// for (let i = 0; i< 10; i++) {
//     const lyricItem = createLyricItem('你好，我是 superman' + i);
//     lyricList.add(lyricItem);
//     lyricItem.position.z = -i * 500;
// }

export default lyricList;
