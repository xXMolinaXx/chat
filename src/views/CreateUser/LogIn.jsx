import React from "react";
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from "antd";

import comunicacionPNG from "../../extras/img/comunicacion.png";
const LogIn = ({
  userName,
  password,
  addUser,
  logUser,
  setUserName,
  setpassword,
}) => {
  return (
    <>
      <h1 className=" text-6xl text-center ">Ingresar?</h1>
      <div className="my-container centerHorizontal pt-5">
        <img src={comunicacionPNG} alt="icono de chat" width={150} />
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
      <Row gutter={48} className="centerHorizontal">
        <Col className="gutter-row">
          <Button className="bg-white" type="link" onClick={addUser}>
            Crear Usuario
          </Button>
        </Col>
        <Col className="gutter-row">
          <Button className="bg-white" onClick={logUser}>
            Ingresar
          </Button>
        </Col>
      </Row>
    </>
  );
};


LogIn.propTypes = {
    userName:PropTypes.string.isRequired,
  password:PropTypes.string.isRequired,
  addUser:PropTypes.func.isRequired,
  logUser:PropTypes.func.isRequired,
  setUserName:PropTypes.func.isRequired,
  setpassword:PropTypes.func.isRequired,
}

export default LogIn;
