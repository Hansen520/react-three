/*
 * @Date: 2025-06-13 14:27:31
 * @Description: description
 */
import { Card, Col, Image, Progress, Row } from "antd";
import BrokenLine from "@/components/Chart/BrokenLine";
import RoseChart from "@/components/Chart/RoseChart";
import NoNetwork from "@/assets/NoNetwork.svg";
import PieChart from "@/components/Chart/PieChart";
import "./index.less";

const Index = () => {
  return (
    <>

      <Row gutter={16} style={{ marginTop: "6px", height: "300px" }}>
        <Col className="gutter-row" span={6}>
          <Card>
          </Card>
        </Col>
        <Col className="gutter-row" span={18} style={{ height: "100%" }}>
          <Card>
            1|2|3|4
          </Card>
        </Col>
      </Row>

    </>
  );
};

export default Index;
