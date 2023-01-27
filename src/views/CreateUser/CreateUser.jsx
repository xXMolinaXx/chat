import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Space, notification } from "antd";

import { my_fetch } from "../../utils/fetch";
import { UserContext } from "../../hooks/userContext";
import LogIn from "./LogIn";
import Registry from "./Registry";
import {
  setValueLocalStorage,
  userLoggedKeyName,
} from "../../utils/localStorage";
const isForm = ["registry", "login"];
const CreateUser = () => {
  const { setUserLogged } = useContext(UserContext);
  let navigate = useNavigate();

  const [form, setform] = useState(isForm[1]);
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [errorMessageRegistry, seterrorMessageRegistry] = useState("");
  const [loading, setloading] = useState(false);
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
    setloading(true);
    seterrorMessageRegistry("");
    let message = "";
    if (newUser.name === "") message += "no ingresastes tu nombre. ";
    if (newUser.lastName === "")
      message += "no ingresastes ninguna contrasena. ";
    if (newUser.userName === "")
      message += "no ingresastes ningun nombre de usuario. ";
    if (newUser.password === "")
      message += "no ingresastes ninguna contrasena. ";
    if (message !== "") {
      setloading(false);
      seterrorMessageRegistry(message);
      return;
    }
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users`,
      newUser
    );
    setloading(false);
    console.log(answer);
    if (answer.statusCode === 401 || answer.statusCode === 400) {
      notification.error({ message: answer.message });
      return;
    }
    setUserLogged(answer.data);
    navigate("/chats");
  };
  const logUser = async () => {
    setloading(true);
    seterrorMessage("");
    let message = "";
    if (userName === "") message += "no ingresastes ningun usuario. ";
    if (password === "") message += "no ingresastes ninguna contrasena. ";
    if (message !== "") {
      setloading(false);
      seterrorMessage(message);
      return;
    }
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { userName, password }
    );
    setloading(false);
    if (
      [401, 500].find(
        (el) => el === answer.statusCode || answer.success === false
      )
    ) {
      notification.error({ message: answer.message });
      return;
    }
    setUserLogged(answer.data);
    setValueLocalStorage(userLoggedKeyName, answer.data);
    navigate("/chats");
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
                errorMessage={errorMessage}
                loading={loading}
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
                errorMessage={errorMessageRegistry}
                loading={loading}
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUser;
