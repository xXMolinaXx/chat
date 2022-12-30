import { Button, Col, Input, Row, DatePicker } from "antd";
import React from "react";
import PropTypes from "prop-types";

import banano from "../../extras/img/minimo.png";

const Registry = ({
  handleChangeLogIn,
  onChangeDatePicker,
  handleCreateUser,
  newUser,
  setnewUser,
}) => {
  return (
    <>
      <h1 className=" text-6xl text-center ">Que Onda!</h1>
      <div className="my-container centerHorizontal pt-5">
        <img alt="icono de chat" width={150} src={banano} />
      </div>
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu nombre"
        value={newUser.name}
        onChange={({ target }) => {
          setnewUser(user=>({...user,name:target.value}))
        }}
      />
      <Input
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu apellido"
        value={newUser.lastName}
        onChange={({ target }) => {
          setnewUser(user=>({...user,lastName:target.value}))
        }}
      />
      <DatePicker
        value={newUser.birthday}
        placeholder="fecha de nacimiento"
        className="w-full mb-5"
        onChange={onChangeDatePicker}
      />
      <Input
        value={newUser.userName}
        className="rounded-md my-5 h-14"
        placeholder="Escribe tu apodo"
        onChange={({ target }) => {
          setnewUser(user=>({...user,userName:target.value}))
        }}
      />
      <Input.TextArea
        value={newUser.description}
        onChange={({ target }) => {
          setnewUser(user=>({...user,description:target.value}))
        }}
        className="rounded-md my-5 h-14"
        placeholder="descripcion breve"
      />
      <Input
        value={newUser.password}
        onChange={({ target }) => {
          setnewUser(user=>({...user,password:target.value}))
        }}
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
          <Button className="bg-white" onClick={handleCreateUser}>Registrar</Button>
        </Col>
      </Row>
    </>
  );
};
Registry.prototype = {
  handleChangeLogIn: PropTypes.func.isRequired,
};

export default Registry;
