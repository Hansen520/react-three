import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh';
import gsap from 'gsap';

export function init(dom: HTMLElement) {

    const scene = new THREE.Scene();
    scene.add(mesh);

    // const axesHelper = new THREE.AxesHelper(500);
    // scene.add(axesHelper);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(500, 400, 300);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 0, 300);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);

    function render(time: number) {
        scene.rotateY(0.01);

        let pageNo = window.scrollY / window.innerHeight;
        camera.position.y = -pageNo * 500; // 滚动条位置与相机位置关联, 滚动的关键


        if (pageNo >= 3 && pageNo < 5.5) {
            camera.position.y = -2000;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render(0);

    dom.append(renderer.domElement);

    window.onresize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    // const controls = new OrbitControls(camera, renderer.domElement);

    let curPageNo = 0; // 当前页数
    window.addEventListener('scroll', () => {
        // 计算滚动一屏
        const pageNo = Math.round(window.scrollY / window.innerHeight);

        console.log(pageNo); // 分别代表第几屏

        if (pageNo !== curPageNo) {
            curPageNo = pageNo;
            gsap.to('.section' + (pageNo + 1) + ' h1', {
                rotate: '+=360',
                duration: 1
            });
        }

        gsap.to(mesh.children[pageNo].scale, {
            x: 0.3,
            y: 0.3,
            z: 0.3,
            yoyo: true,
            repeat: 1,
            duration: 0.5,
            ease: 'bounce.in'
        })
    });

    // window.addEventListener('mousemove', (e) => {
    //     const moveX = (e.clientX / window.innerWidth) - 0.5;

    //     camera.position.x += moveX * 300 - camera.position.x;
    // });

    return {
        scene,
        renderer,
        // controls
    }
}
