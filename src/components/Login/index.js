/** @format */
import firebase, { auth } from "../../firebase/config";
import React from "react";
import { Row, Col, Typography, Button } from "antd";

const { Title } = Typography;

const fbProvider = firebase.auth.FacebookAuthProvider();

export default function Login() {
  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider);
  };

  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
