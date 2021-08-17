/** @format */

import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";

const { Text } = Typography;

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div className=''>
        <Avatar size='small' src={photoURL}>
          A
        </Avatar>
        <Text className='author'>{displayName}</Text>
        <Text className='date'>{formatDate(createdAt?.seconds)}</Text>
      </div>
      <div className=''>
        <Text className='content'>{text}</Text>
      </div>
    </WrapperStyled>
  );
}
