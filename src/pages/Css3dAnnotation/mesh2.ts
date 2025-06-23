/*
 * @Date: 2025-06-23 16:25:57
 * @Description: description
 */
import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/Addons.js';

const geometry = new THREE.BoxGeometry(800, 500, 100);
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue')
});

const mesh = new THREE.Mesh(geometry, material);

const ele = document.createElement('div');
ele.innerHTML = `<div style="background:#fff;width:700px;height:400px;">
    <h1>这是网页</h1>
    <div style="display:flex;">
        <img src="https://picsum.photos/200/300" style="max-height:300px"/>
        <div>
            丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。
            明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。
            转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。
        </div>
    </div>
</div>`;
ele.style.transformStyle = 'preserve-3d';
ele.style.backfaceVisibility = 'hidden';

const obj = new CSS3DObject(ele);
obj.position.y = 0;
mesh.add(obj);


export default mesh;