import { useEffect, useState, useRef } from "react";
import { init3D } from "./init-3d";
import { init2D } from "./init-2d";
import { Button } from "antd";
import * as THREE from "three";
import { useHouseStore } from "@/store/index";

function Main() {
  const [curMode, setCurMode] = useState("2d");
  const scene3DRef = useRef<THREE.Scene | null>(null);
  const scene2DRef = useRef<THREE.Scene | null>(null);
  const { data } = useHouseStore();

  useEffect(() => {
    const dom = document.getElementById("threejs-3d-container")!;
    const { scene } = init3D(dom);
    scene3DRef.current = scene;
    return () => {
      dom.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    const dom = document.getElementById("threejs-2d-container")!;
    const { scene } = init2D(dom);
    scene2DRef.current = scene;
    return () => {
      dom.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    // const scene = scene3DRef.current!;
    // const walls = data.walls.map((item) => {
    //   const shape = new THREE.Shape();
    //   shape.moveTo(item.p1.x, item.p1.z);
    //   shape.lineTo(item.p2.x, item.p2.z);
    //   shape.lineTo(item.p3.x, item.p3.z);
    //   shape.lineTo(item.p4.x, item.p4.z);
    //   shape.lineTo(item.p1.x, item.p1.z);
    //   const geometry = new THREE.ExtrudeGeometry(shape, {
    //     depth: 500,
    //   });
    //   const material = new THREE.MeshPhongMaterial({
    //     color: "white",
    //   });
    //   const wall = new THREE.Mesh(geometry, material);
    //   wall.rotateX(-Math.PI / 2);
    //   return wall;
    // });
    // scene.add(...walls);
    const scene = scene3DRef.current!;
    const walls = data.walls.map((item) => {
      const shape = new THREE.Shape();
      shape.moveTo(item.left.x, item.left.z);
      shape.lineTo(item.right.x, item.right.z);
      shape.lineTo(item.right.x, item.right.z + item.height);
      shape.lineTo(item.left.x, item.left.z + item.height);
      shape.lineTo(item.left.x, item.left.z);

      item.windows.forEach((win) => {
        const path = new THREE.Path();

        const { x, z } = win.leftBottomPosition;

        path.moveTo(x, z);
        path.lineTo(x + win.width, z);
        path.lineTo(x + win.width, z + win.height);
        path.lineTo(x, z + win.height);
        path.lineTo(x, z);
        shape.holes.push(path);
      });

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: item.depth,
      });
      const material = new THREE.MeshPhongMaterial({
        color: "white",
      });
      const wall = new THREE.Mesh(geometry, material);
      // wall.rotateX(-Math.PI/2);
      return wall;
    });

    scene.add(...walls);
  }, [data]);

  useEffect(() => {
    // const scene = scene2DRef.current!;
    // const walls = data.walls.map((item) => {
    //   const shape = new THREE.Shape();
    //   shape.moveTo(item.p1.x, item.p1.z);
    //   shape.lineTo(item.p2.x, item.p2.z);
    //   shape.lineTo(item.p3.x, item.p3.z);
    //   shape.lineTo(item.p4.x, item.p4.z);
    //   shape.lineTo(item.p1.x, item.p1.z);
    //   const geometry = new THREE.ShapeGeometry(shape);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: "white",
    //   });
    //   const wall = new THREE.Mesh(geometry, material);
    //   wall.rotateX(-Math.PI / 2);
    //   return wall;
    // });
    // scene.add(...walls);
  }, [data]);

  return (
    <div className="Main">
      <div
        id="threejs-3d-container"
        style={{ display: curMode === "3d" ? "block" : "none" }}
      ></div>
      <div
        id="threejs-2d-container"
        style={{ display: curMode === "2d" ? "block" : "none" }}
      ></div>

      <div className="mode-change-btns">
        <Button
          type={curMode === "2d" ? "primary" : "default"}
          onClick={() => setCurMode("2d")}
        >
          2D
        </Button>
        <Button
          type={curMode === "3d" ? "primary" : "default"}
          onClick={() => setCurMode("3d")}
        >
          3D
        </Button>
      </div>
    </div>
  );
}

export default Main;
