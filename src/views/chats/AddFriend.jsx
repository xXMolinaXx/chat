import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const AddFriend = ({
  onFinish,
  onFinishFailed,
  friendToAdd,
  handleOnchange,
}) => {
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          className="px-3"
          name="username"
          rules={[
            { required: true, message: "ingrese el codigo de un usuario" },
          ]}
        >
          <Input
            placeholder="codigo de usuario"
            type="text"
            onChange={handleOnchange}
            value={friendToAdd}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="dashed" htmlType="submit">
            agregar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddFriend;
