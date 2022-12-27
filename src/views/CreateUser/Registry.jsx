import { Button, Col, Input, Row } from "antd";
import React from "react";
import PropTypes from "prop-types";

import banano from "../../extras/img/minimo.png";

const Registry = ({handleChangeLogIn}) => {
  return (
    <>
      <h1 className=" text-6xl text-center ">Que Onda!</h1>
      <div className="my-container centerHorizontal pt-5">
        <img alt="icono de chat" width={150} src={banano} />
      </div>
      <Input className="rounded-md my-5 h-14" placeholder="Escribe tu nombre" />
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu apellido"
      />
      <Input className="rounded-md my-5 h-14" placeholder="Escribe tu apodo" />
      <Input.TextArea
        className="rounded-md my-5 h-14"
        placeholder="descripcion breve"
      />
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Contrasena"
        type="password"
      />
      <Row gutter={48} className="centerHorizontal">
        <Col className="gutter-row">
          <Button className="bg-white" type="link" onClick={handleChangeLogIn}>
            Ingresar con usuario
          </Button>
        </Col>
        <Col className="gutter-row">
          <Button className="bg-white">Registrar</Button>
        </Col>
      </Row>
    </>
  );
};
Registry.prototype = {
    handleChangeLogIn:PropTypes.func.isRequired
}

export default Registry;
