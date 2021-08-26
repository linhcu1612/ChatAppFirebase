/** @format */

import React, { useContext, useState, useMemo } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "Context/AppProvider";
import { debounce } from "lodash";
import { db } from "firebase/config";

const { Option } = Select;

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}>
      {options.map(({ label, value, photoURL }) => (
        <Option key={value}>
          <Avatar size='small' src={photoURL}>
            {photoURL ? "" : label.charAt(0).toUpperCase()}
          </Avatar>
          {`${label}`}
        </Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
}

export default function AddRoomModal() {
  const {
    isInviteMemberVisible,
    setInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setInviteMemberVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title='Invite Friends'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            label='Users Name'
            value={value}
            placeholder='Type in username'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
