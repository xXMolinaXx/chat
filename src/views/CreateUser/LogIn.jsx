import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Row, Col, Space, Alert, Spin } from "antd";

import logo from "../../extras/img/chat.png";
const LogIn = ({
  userName,
  password,
  addUser,
  logUser,
  setUserName,
  setpassword,
  errorMessage,
  loading,
}) => {
  return (
    <>
      <h1 className=" text-6xl text-center ">Ingresar</h1>
      <div className="my-container centerHorizontal pt-5">
        <img src={logo} alt="icono de chat" width={150} />
      </div>
      <Input
        value={userName}
        onChange={({ target }) => setUserName(target.value)}
        className="rounded-md my-5 h-14"
        placeholder="Nombre de usuario"
      />
      <Input
        value={password}
        onChange={({ target }) => setpassword(target.value)}
        className="rounded-md my-5 h-14"
        placeholder="Contrasena"
        type="password"
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        {errorMessage && <Alert message={errorMessage} type="error" />}
        <Row gutter={48} className="centerHorizontal">
          <Col className="gutter-row">
            <Spin spinning={loading}>
              <Button className="bg-white" type="link" onClick={addUser}>
                Crear Usuario
              </Button>
            </Spin>
          </Col>
          <Col className="gutter-row">
            <Spin spinning={loading}>
              <Button className="bg-white" onClick={logUser}>
                Ingresar
              </Button>
            </Spin>
          </Col>
        </Row>
      </Space>
    </>
  );
};

LogIn.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  addUser: PropTypes.func.isRequired,
  logUser: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setpassword: PropTypes.func.isRequired,
};

export default LogIn;
