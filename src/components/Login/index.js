/** @format */
import { signInWithGoogle, signInWithFb } from "firebase/login";
import React from "react";
import { Row, Col, Typography, Button } from "antd";

const { Title } = Typography;

export default function Login() {
  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={signInWithGoogle}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={signInWithFb}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
