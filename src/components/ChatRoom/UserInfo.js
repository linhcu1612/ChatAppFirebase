/** @format */

import React from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  return (
    <WrapperStyled>
      <div className=''>
        <Avatar>Hi</Avatar>
        <Typography.Text className='username'>Linh</Typography.Text>
      </div>
      <Button ghost>Logout</Button>
    </WrapperStyled>
  );
}
