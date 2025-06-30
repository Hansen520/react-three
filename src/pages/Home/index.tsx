/*
 * @Date: 2025-06-13 14:27:31
 * @Description: description
 */
import { useEffect, useRef } from "react";
import { Card, Col, Image, Progress, Row } from "antd";
import BrokenLine from "@/components/Chart/BrokenLine";
import RoseChart from "@/components/Chart/RoseChart";
import NoNetwork from "@/assets/NoNetwork.svg";
import PieChart from "@/components/Chart/PieChart";
import "./index.less";

const Index = () => {
  const canvasRef = useRef<any>(null);
  const paint = useRef<boolean>(false);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    ctx.fillText('Canvas 随手画板', 100, 100);
    ctx.fillStyle = '#8f575737';
    ctx.font = "20px Arial";
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(100, 100);
    // ctx.stroke();

    canvasRef.current!.addEventListener("mousedown", (e: any) => {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      paint.current = true;
    });

    canvasRef.current!.addEventListener("mousemove", (e: any) => {
      if (paint.current) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    });

    canvasRef.current!.addEventListener("mouseup", () => {
      paint.current = false;
    })
  }, []);

  return (
    <>
      <Row gutter={16} style={{ marginTop: "6px", height: "300px" }}>
        <Col className="gutter-row" span={6}>
          <Card>
            <p>目标：成为WebGIS大师</p>
            <p>threeJS 与 Cesium 与 WebGL相关的实战和知识点</p>
          </Card>
        </Col>
        <Col className="gutter-row" span={18} style={{ height: "100%" }}>
          <Card>
            <canvas ref={canvasRef} width={400} height={250} style={{ border: "1px solid #ccc" }}></canvas>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Index;
