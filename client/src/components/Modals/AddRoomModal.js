/** @format */

import React, { useContext } from "react";
import { Modal, Form, Input } from "antd";
import { AppContext } from "Context/AppProvider";
import { AuthContext } from "Context/AuthProvider";
import { addDocument } from "firebase/services";

const { Item } = Form;
const { TextArea } = Input;

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    setIsAddRoomVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title='Create Room'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} layout='vertical'>
          <Item label='Room Name' name='name'>
            <Input placeholder='Name of the Room' />
          </Item>
          <Item label='Description' name='description'>
            <TextArea placeholder='Description of the Room' />
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
