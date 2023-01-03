import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Space,message as messageAnt, notification } from "antd";

import { my_fetch } from "../../utils/fetch";
import { UserContext } from "../../hooks/userContext";
import LogIn from "./LogIn";
import Registry from "./Registry";
const isForm = ["registry", "login"];
const CreateUser = () => {
  const { setUserLogged } = useContext(UserContext);
  let navigate = useNavigate();
  
  const [form, setform] = useState(isForm[1]);
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [newUser, setnewUser] = useState({
    name: "",
    lastName: "",
    userName: "",
    description: "",
    password: "",
    birthday: null,
  });
  const addUser = async () => {
    setform(isForm[0]);
  };
  const onChangeDatePicker = (date, dateString) => {
    setnewUser((user) => ({ ...user, birthday: date._d }));
  };
  const handleCreateUser = async () => {
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users`,
      newUser
    );
    
  };
  const logUser = async () => {
    let message = '';
    if(userName === '') message = `${message} \n no ingresastes ningun usuario.`
    if(password === '') message = `${message} \n no ingresastes ninguna contrasena`
    if( message !== '') {
      notification.error({message})
      return;
    }
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { userName, password }
    );
    if(!answer.success){
      notification.error({message:answer.message})
      return;
    }
  };
  return (
    <div className="h-full chatBackground ">
      <Row className="h-full">
        <Col
          md={10}
          sm={24}
          className="bg-white flex content-center justify-center p-10"
        >
          <Space align="center">
            {form === isForm[1] ? (
              <LogIn
                addUser={addUser}
                logUser={logUser}
                password={password}
                setUserName={setUserName}
                setpassword={setpassword}
                userName={userName}
              />
            ) : (
              <Registry
                handleChangeLogIn={() => {
                  setform(isForm[1]);
                }}
                handleCreateUser={handleCreateUser}
                newUser={newUser}
                setnewUser={setnewUser}
                onChangeDatePicker={onChangeDatePicker}
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUser;
