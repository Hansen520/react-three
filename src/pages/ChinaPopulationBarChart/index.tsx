/*
 * @Date: 2025-07-03 16:20:00
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
// import mesh2 from "./mesh2";

function ChinaPopulationBarChart() {
    const mount = useRef<HTMLDivElement>(null);
    const scene = new THREE.Scene();

    useEffect(() => {
        {
            scene.add(mesh);
            // scene.add(mesh2);

            const light = new THREE.DirectionalLight(0xffffff);
            light.position.set(500, 300, 600);
            scene.add(light);

            const light2 = new THREE.AmbientLight();
            scene.add(light2);

            // const ambientLight = new THREE.AmbientLight();
            // scene.add(ambientLight);

            const axesHelper = new THREE.AxesHelper(1000);
            scene.add(axesHelper);

            const width = mount.current!.clientWidth;
            const height = mount.current!.clientHeight;

            const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
            camera.position.set(0, 200, 600);
            camera.lookAt(0, 0, 0);

            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(width, height);

            function render() {
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }

            render();
            const controls = new OrbitControls(camera, renderer.domElement);
            (mount.current as any).appendChild(renderer.domElement);

            window.onresize = function () {
                const width = window.innerWidth;
                const height = window.innerHeight;

                renderer.setSize(width, height);

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            };
        }
    }, []);

    return (
        <>
            <div ref={mount} style={{ width: "100%", height: "100%" }} />
        </>
    );
}

export default ChinaPopulationBarChart;
