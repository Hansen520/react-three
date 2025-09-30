import gsap from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("/glb/Michelle/Michelle.glb", function (gltf) {
    console.log(gltf);
    mesh.add(gltf.scene);

    gltf.scene.scale.setScalar(150);

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clipAction = mixer.clipAction(gltf.animations[0]);
    clipAction.play();

    clipAction.paused = true; // 先让他停止



    const clock = new THREE.Clock();
    function render() {
        requestAnimationFrame(render);

        const delta = clock.getDelta();
        mixer.update(delta);

        const pageNo = Math.round(window.scrollY / window.innerHeight);
        if (pageNo === 3) { // 当滚动到第三页时，播放动画
            const percent = window.scrollY / window.innerHeight - 2.5
            clipAction.time = gltf.animations[0].duration * percent;

            console.log(percent)
        }
    }
    render();

    const fish1: any = gltf.scene.getObjectByName("BrownFishArmature_13");
    const fish2: any = gltf.scene.getObjectByName("ClownFishArmature_23");
    const fish3 = gltf.scene.getObjectByName("TunaArmature_33");
    const fish4 = gltf.scene.getObjectByName("DoryArmature_47");

    fish1.parent.remove(fish1, fish3, fish4);

    fish2.name = 'fish';

})

export default mesh;
