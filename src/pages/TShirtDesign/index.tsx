/*
 * @Date: 2025-07-11 16:08:09
 * @Description: description
 */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh";
import { DecalGeometry } from "three/examples/jsm/Addons.js";
import { Button, ColorPicker, Radio } from "antd";
import gsap from "gsap";
// import mesh2 from "./mesh2";

function TShirtDesign() {
  const mount = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();

  const changeTShirtColorRef = useRef<any>("");
  const changeTextureRef = useRef<any>("");
  const downloadImgRef = useRef<any>("");
  const downloadVideoRef = useRef<any>("");

  useEffect(() => {
    {
      scene.add(mesh);
      // scene.add(mesh2);

      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(500, 400, 300);
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const axesHelper = new THREE.AxesHelper(500);
      scene.add(axesHelper);

      const width = mount.current!.clientWidth;
      const height = mount.current!.clientHeight;

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(0, 500, 500);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      window.onresize = function () {
        // const width = window.innerWidth;
        // const height = window.innerHeight;
        const width = mount.current!.clientWidth;
        const height = mount.current!.clientHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      render();
      const controls = new OrbitControls(camera, renderer.domElement);
      (mount.current as any).appendChild(renderer.domElement);

      const loader = new THREE.TextureLoader();
      // const texture = loader.load("/heart.png");
      // texture.colorSpace = THREE.SRGBColorSpace;

      let texture: any = null;

      renderer.domElement.addEventListener("click", (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections: any = rayCaster.intersectObjects(mesh.children);

        if (intersections.length) {
          const position = intersections[0].point;

          if (!texture) {
            return;
          }

          const orientation = new THREE.Euler();
          const size = new THREE.Vector3(100, 100, 100);
          const geometry = new DecalGeometry(intersections[0].object, position, orientation, size);
          const material = new THREE.MeshPhongMaterial({
            polygonOffset: true,
            polygonOffsetFactor: -4,
            map: texture,
            transparent: true,
          });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        }
      });
      // 改变颜色
      function changeTShirtColor(color: string) {
        const tshirt: any = scene.getObjectByName("tshirt");
        if (tshirt) {
          tshirt.material.color.set(color);
        }
      }

      // 改变贴花
      function changeTexture(url: string) {
        texture = loader.load(url);
        texture.colorSpace = THREE.SRGBColorSpace;
      }

      // 下载图片
      function downloadBlob(blob: any, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      // 转成图片
      function downloadImg() {
        renderer.render(scene, camera);
        // 转成blob
        renderer.domElement.toBlob((blob) => {
          if (blob) {
            downloadBlob(blob, "design.png");
          }
        }, "image/png");
      }

      // 下载视频
      function downloadVideo() {
        // 转成流,renderer.domElement = domElement
        const stream = renderer.domElement.captureStream(60);
        const recorder = new MediaRecorder(stream);
        recorder.start();
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            downloadBlob(event.data, `design.webm`);
          }
        };
        // setTimeout(() => {
        //   recorder.stop();
        // }, 3000);
        gsap.to(scene.rotation, {
          y: 2 * Math.PI,
          duration: 3,
          onComplete() {
            scene.rotation.y = 0;
            recorder.stop();
          }
        })
      }

      // 初始化函数赋值
      changeTShirtColorRef.current = changeTShirtColor;
      changeTextureRef.current = changeTexture;
      downloadImgRef.current = downloadImg;
      downloadVideoRef.current = downloadVideo;
    }
  }, []);

  return (
    <>
      <div id="operate" style={{ position: "absolute", top: 100, left: 20, color: "#fff" }}>
        <div className="ope-item" style={{ width: 100, display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: 15 }}>颜色:</div>
          <div>
            <ColorPicker
              defaultValue={"#ffffff"}
              onChange={(color) => {
                // 函数执行
                changeTShirtColorRef.current(color.toRgbString());
              }}
            />
          </div>
        </div>
        <div className="ope-item" style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 50, paddingRight: 15 }}>图案:</div>
          <div>
            <Radio.Group>
              <Radio
                style={{ color: "#fff" }}
                value={"/xiaoxin.png"}
                onChange={(e) => {
                  changeTextureRef.current(e.target.value);
                }}
              >
                小新
              </Radio>
              <Radio
                style={{ color: "#fff" }}
                value={"/heart.png"}
                onChange={(e) => {
                  changeTextureRef.current(e.target.value);
                }}
              >
                爱心
              </Radio>
              <Radio
                style={{ color: "#fff" }}
                value={"/zhuan.png"}
                onChange={(e) => {
                  changeTextureRef.current(e.target.value);
                }}
              >
                砖块
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="ope-item" style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" onClick={() => downloadImgRef.current()}>
            保存为图片
          </Button>
          <Button type="default" onClick={() => downloadVideoRef.current()}>保存为视频</Button>
        </div>
      </div>
      <div ref={mount} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default TShirtDesign;
