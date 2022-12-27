import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { my_fetch } from "../../utils/fetch";
import { UserContext } from "../../hooks/userContext";
import { notification } from "antd";
import LogIn from "./LogIn";
import Registry from "./Registry";
const isForm = ["registry", "login"];
const CreateUser = () => {
  const { setUserLogged } = useContext(UserContext);
  let navigate = useNavigate();
  const [form, setform] = useState(isForm[1]);
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const addUser = async () => {
    setform(isForm[0]);
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
    <div className="flex flex-row h-full chatBackground">
      <div className="p-5 bg-white h-full grid content-center w-3/12">
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
          <Registry handleChangeLogIn={()=>{setform(isForm[1])}} />
        )}
      </div>
      <div className="pl-20 pt-10">{/* TODO */}</div>
    </div>
  );
};

export default CreateUser;
