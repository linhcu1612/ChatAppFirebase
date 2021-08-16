/** @format */

import React, { useContext, useMemo } from "react";
import useFirestore from "hooks/useFirestore";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AuthContext } from "Context/AuthProvider";
import styled from "styled-components";
const { Panel } = Collapse;
const { Link } = Typography;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { uid } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header='Room List' keys='1'>
        {rooms.map((room) => (
          <LinkStyled key={room.id}>{room.name}</LinkStyled>
        ))}
        <Button type='text' icon={<PlusSquareOutlined />} className='add-room'>
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
