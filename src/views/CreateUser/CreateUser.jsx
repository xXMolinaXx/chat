import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { my_fetch } from "../../utils/fetch";
import { UserContext } from "../../hooks/userContext";
import { Col, notification, Row, Space } from "antd";
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
  });
  const addUser = async () => {
    setform(isForm[0]);
  };
  const handleCreateUser = async () => {
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users`,
      newUser
    );
    if (answer?.success) {
      setUserLogged(answer.data);
      navigate("/chats");
    } else
      notification.open({
        message: "Error",
        description: answer?.message,
      });
  };
  const logUser = async () => {
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { userName, password }
    );
    if (answer?.sucess) {
      setUserLogged(answer.data);
      navigate("/chats");
    } else console.log(answer);
    notification.open({
      message: "Error",
      description: answer?.message,
    });
  };
  return (
    <div className="h-full chatBackground ">
      <Row className="h-full">
        <Col md={10} sm={24} className="md:bg-white bg-white/70 h-full flex justify-center p-10">
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
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUser;
