import {
  Alert,
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Row,
  Space,
  Spin,
} from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import MainLayout from "../layouts/MainLayout";
import { my_fetch } from "../../utils/fetch";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../extras/img/chat.png";
import { UserContext } from "../../hooks/userContext";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

const UserSetting = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const { setUserLogged } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const [seterrorMessageRegistry, ] = useState("");
  const [user, setuser] = useState({
    name: "",
    lastName: "",
    userName: "",
    description: "",
    password: "",
    birthday: null,
  });
  const handleUpdate = async () => {
    setloading(true);
    let message = "";
    if (user.name === "") message += "no ingresastes tu nombre. ";
    if (user.lastName === "") message += "no ingresastes ninguna contrasena. ";
    if (message !== "") {
      setloading(false);
      seterrorMessageRegistry(message);
      return;
    }
    const answer = await my_fetch.my_fetch_put(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      user
    );
    setloading(false);
    notification.info({ message: answer.message });
    return;
  };
  const handleDelete = async () => {
    setloading(true);
    const answer = await my_fetch.my_fetch_delete(
      `${process.env.REACT_APP_API_URL}/users/${id}`
    );
    setloading(false);
    if (answer.statusCode === 401) {
      notification.info({ message: answer.message });
      return;
    }
    setUserLogged({});
    notification.info({ message: answer.message });
    navigate("/");
    return;
  };
  const getUser = useCallback(async () => {
    const answer = await my_fetch.my_fetch_get(
      `${process.env.REACT_APP_API_URL}/users/${id}`
    );
    setuser(answer);
  },[id]);
  useEffect(() => {
    getUser();
    return () => {};
  }, [getUser]);

  return (
    <MainLayout>
      <div className="m-10 p-10 bg-white  drop-shadow-2xl">
        <Row gutter={16}>
          <Col
            className="gutter-row flex flex-col justify-center"
            xs={24}
            md={12}
          >
            <div className="my-container centerHorizontal pt-5">
              <img src={logo} alt="icono de chat" width={150} />
            </div>
            {/* <div className="mr-auto ml-auto">
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <Input
              value={user.userName}
              className="rounded-md my-5 h-14"
              disabled
            />
            <Input.TextArea
              value={user.description}
              className="rounded-md my-5 h-14"
              disabled
            /> */}
          </Col>
          <Col className="gutter-row" xs={24} md={12}>
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
                defaultValue={dayjs("2015/01/01", dateFormat)}
                onChange={(date, stringDate) => {
                  setuser({ ...user, birthday: stringDate });
                }}
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
                {seterrorMessageRegistry && (
                  <Alert message={"asd"} type="error" />
                )}
                <Row gutter={48} className="centerHorizontal">
                  <Col className="gutter-row">
                    <Spin spinning={loading}>
                      <Button className="bg-white" onClick={handleUpdate}>
                        Actualizar
                      </Button>
                    </Spin>
                  </Col>
                  <Col className="gutter-row">
                    <Spin spinning={loading}>
                      <Button className="bg-white" onClick={handleDelete}>
                        Eliminar Usuario
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
