import {
  Alert,
  Avatar,
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Space,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { my_fetch } from "../../utils/fetch";
import { useParams } from "react-router-dom";
const UserSetting = () => {
  let { id } = useParams();
  const [user, setuser] = useState({
    name: "",
    lastName: "",
    userName: "",
    description: "",
    password: "",
    birthday: null,
  });
  const getUser = async () => {
    const answer = await my_fetch.my_fetch_get(
      `${process.env.REACT_APP_API_URL}/users/${id}`
    );
    setuser(answer);
  };
  useEffect(() => {
    getUser();
    return () => {};
  }, []);

  return (
    <MainLayout>
      <div className="m-10 p-10 bg-white  drop-shadow-2xl">
        <Row gutter={16}>
          <Col className="gutter-row bg-black" span={12}>
            <Avatar size={100} icon={<UserOutlined />} />
          </Col>
          <Col className="gutter-row" span={12}>
            <>
              <h4 className=" text-6xl text-center ">
                Actualiza tu informacion!
              </h4>
              <Input
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu nombre"
                value={user.name}
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, name: target.value }));
                }}
              />
              <Input
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu apellido"
                value={user.lastName}
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, lastName: target.value }));
                }}
              />
              <DatePicker
                placeholder="fecha de nacimiento"
                className="w-full mb-5"
                onChange={() => {}}
              />
              <Input
                value={user.userName}
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu apodo"
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, userName: target.value }));
                }}
              />
              <Input.TextArea
                value={user.description}
                onChange={({ target }) => {
                  setuser((user) => ({
                    ...user,
                    description: target.value,
                  }));
                }}
                className="rounded-md my-5 h-14"
                placeholder="descripcion breve"
              />
              <Space direction="vertical" style={{ width: "100%" }}>
                {true && <Alert message={"asd"} type="error" />}
                <Row gutter={48} className="centerHorizontal">
                  <Col className="gutter-row">
                    <Spin spinning={false}>
                      <Button className="bg-white" onClick={() => {}}>
                        Actualizar
                      </Button>
                    </Spin>
                  </Col>
                </Row>
              </Space>
            </>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default UserSetting;
