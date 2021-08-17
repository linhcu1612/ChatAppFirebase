/** @format */

import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Avatar, Tooltip, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "Context/AppProvider";
import { AuthContext } from "Context/AuthProvider";
import { addDocument } from "firebase/services";
import useFirestore from "hooks/useFirestore";

const { Item } = Form;

const { Group } = Avatar;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function ChatWindow() {
  const { selectedRoom, members, setInviteMemberVisible } =
    useContext(AppContext);
  const { uid, photoURL, displayName } = useContext(AuthContext);

  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const { name, description } = selectedRoom;

  const [form] = Form.useForm();

  const handleInviteButton = () => {
    setInviteMemberVisible(true);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      roomId: selectedRoom.id,
      uid,
      photoURL,
      displayName,
    });

    form.resetFields(["message"]);

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);
  console.log(messages);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{name}</p>
              <span className='header__description'>{description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                type='text'
                icon={<UserAddOutlined />}
                onClick={handleInviteButton}>
                Invite
              </Button>
              <Group size='small' maxCount={2}>
                {members.map(({ displayName, uid }) => (
                  <Tooltip title={displayName} key={uid}>
                    <Avatar>{displayName.charAt(0).toUpperCase()}</Avatar>
                  </Tooltip>
                ))}
              </Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Item name='message'>
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleInputSubmit}
                  bordered={false}
                  autoComplete='off'
                  placeholder='Text Message'
                />
              </Item>
              <Button type='primary' onClick={handleInputSubmit}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message='Pick a room you are in or create a new room'
          type='info'
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
