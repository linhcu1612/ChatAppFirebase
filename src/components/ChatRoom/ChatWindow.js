/** @format */

import React, { useContext } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Avatar, Tooltip, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "Context/AppProvider";

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

  const { name, description } = selectedRoom;

  const handleInviteButton = () => {
    setInviteMemberVisible(true);
  };

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
            <MessageListStyled>
              <Message
                text='Test'
                photoURL={null}
                displayName='Linh'
                createdAt={1212121212}
              />
            </MessageListStyled>
            <FormStyled>
              <Item>
                <Input
                  bordered={false}
                  autoComplete='off'
                  placeholder='Text Message'
                />
              </Item>
              <Button type='primary'>Send</Button>
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
