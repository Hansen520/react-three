import * as THREE from "three";

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: "orange",
});
const mesh = new THREE.Mesh(geometry, material);

mesh.name = "Box";
// 给 mesh 加上 name 属性，然后定义它在 0、2、5 秒的值，创建 KeyframeTrack，也就是一个属性变化的关键帧。
const times = [0, 2, 5];
// 就是说2s后变成100，5s后变成-100
const valus = [0, 0, 0, 0, 100, 0, 0, 0, -100];
const track = new THREE.KeyframeTrack("Box.position", times, valus);
// const clip = new THREE.AnimationClip('hello', 5, [track]);

const times2 = [0, 1, 4];
// 1s后变成2，4s后变成0.5
const values2 = [1, 1, 1, 1, 2, 1, 1, 0.5, 1];
const track2 = new THREE.KeyframeTrack("Box.scale", times2, values2);

const clip = new THREE.AnimationClip("hello", 5, [track, track2]);

const mixer = new THREE.AnimationMixer(mesh);
const clipAction = mixer.clipAction(clip);
clipAction.play();

clipAction.timeScale = 2;
setTimeout(() => {
  clipAction.paused = true;
}, 2000);

const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const delta = clock.getDelta();
  mixer.update(delta);
}

render();

export default mesh;
