import { Button, Col, Input, Row, DatePicker, Space, Alert, Spin } from "antd";
import React from "react";
import PropTypes from "prop-types";

import logo from "../../extras/img/chat.png";

const Registry = ({
  handleChangeLogIn,
  onChangeDatePicker,
  handleCreateUser,
  newUser,
  setnewUser,
  errorMessage,
  loading,
}) => {
  return (
    <>
      <h1 className=" text-6xl text-center ">Que Onda!</h1>
      <div className="my-container centerHorizontal pt-5">
        <img alt="icono de chat" width={150} src={logo} />
      </div>
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu nombre"
        value={newUser.name}
        onChange={({ target }) => {
          setnewUser((user) => ({ ...user, name: target.value }));
        }}
      />
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu apellido"
        value={newUser.lastName}
        onChange={({ target }) => {
          setnewUser((user) => ({ ...user, lastName: target.value }));
        }}
      />
      <DatePicker
        placeholder="fecha de nacimiento"
        className="w-full mb-5"
        onChange={onChangeDatePicker}
      />
      <Input
        value={newUser.userName}
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu apodo"
        onChange={({ target }) => {
          setnewUser((user) => ({ ...user, userName: target.value }));
        }}
      />
      <Input.TextArea
        value={newUser.description}
        onChange={({ target }) => {
          setnewUser((user) => ({ ...user, description: target.value }));
        }}
        className="rounded-md my-5 h-14"
        placeholder="descripcion breve"
      />
      <Input
        value={newUser.password}
        onChange={({ target }) => {
          setnewUser((user) => ({ ...user, password: target.value }));
        }}
        className="rounded-md my-5 h-14"
        placeholder="Contrasena"
        type="password"
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        {errorMessage && <Alert message={errorMessage} type="error" />}
        <Row gutter={48} className="centerHorizontal">
          <Col className="gutter-row">
            <Spin spinning={loading}>
              <Button
                className="bg-white"
                type="link"
                onClick={handleChangeLogIn}
              >
                Ingresar con usuario
              </Button>
            </Spin>
          </Col>
          <Col className="gutter-row">
            <Spin spinning={loading}>
              <Button className="bg-white" onClick={handleCreateUser}>
                Registrar
              </Button>
            </Spin>
          </Col>
        </Row>
      </Space>
    </>
  );
};
Registry.prototype = {
  handleChangeLogIn: PropTypes.func.isRequired,
};

export default Registry;
