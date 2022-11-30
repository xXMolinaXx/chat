import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../hooks/userContext";
import { notification } from "antd";
import { my_fetch } from "../../utils/fetch";
import MainLayout from "../layouts/MainLayout";
import { screenSize } from "../../const/screensize";
import SmallDeviceView from "./SmallDeviceView";
import MediumDeviceView from "./MediumDeviceView";

const socket = io(process.env.REACT_APP_API_URL);
/*
EVENTO DE CONECT
socket.on("connect", () => {
  console.log(socket.id);
  console.log("estado del socket =>", socket.connected);
});
socket.on("login", (value) => {
  console.log("valor de bienvenida =>", value);
});
EVENTO ERRO DE CONEXION
socket.on("connect_error", () => {
  console.log("no me pude conectar");
});
EVENTO DE DESCONEXION
socket.on("disconnect", () => {
  console.log("socket desconectado");
});
EVENTO DE INTENTO DE CONEXION
socket.io.on("reconnect_attempt", () => {
  console.log("intento de reconexion");
});
CUANDO SE CONECTA
socket.io.on("reconnect", () => {
  console.log("intento de reconecion exitoso");
});
socket.on("everyone", (message) => {
  console.log(message);
});*/
const Chats = () => {
  const { userLogged } = useContext(UserContext);
  const [showModal, setshowModal] = useState(false);
  const [userNameAdd, setuserNameAdd] = useState("");
  const [userFriends, setuserFriends] = useState([]);
  const [showUsers] = useState(true);
  const [message, setmessage] = useState("");
  const [myMessage, setmyMessage] = useState("");
  const onKeySendMessage = (event) => {
    if (event.key === "Enter") {
      socket.emit("chating", message);
    }
  };
  const addFriend = async () => {
    const answer = await my_fetch.my_fetch_post(
      `${process.env.REACT_APP_API_URL}/users/addFriend`,
      {
        userName: userNameAdd,
        userLoggedId: userLogged._id,
      }
    );
    notification.open({
      description: answer.message,
    });
    if (answer.success) {
      const answer2 = await my_fetch.my_fetch_post(
        `${process.env.REACT_APP_API_URL}/users/getfriends`,
        {
          userId: userLogged._id,
        }
      );
      setuserFriends(answer2.data);
    }
  };
  useEffect(() => {
    (async () => {
      const answer2 = await my_fetch.my_fetch_post(
        `${process.env.REACT_APP_API_URL}/users/getfriends`,
        {
          userId: userLogged._id,
        }
      );
      setuserFriends(answer2.data);
    })();

    return () => {
      setuserFriends([]);
    };
  }, [userLogged._id]);
  useEffect(() => {
    socket.on("receiveMessage", (mensaje) => {
      setmyMessage(mensaje);
    });
  }, []);

  return (
    <MainLayout>
      <div className="h-full grid-container ">
        {screenSize.medium < window.innerWidth && (
          <MediumDeviceView
            myMessage={myMessage}
            onKeySendMessage={onKeySendMessage}
            setmessage={setmessage}
            message={message}
            showModal={showModal}
            setshowModal={setshowModal}
            userNameAdd={userNameAdd}
            setuserNameAdd={setuserNameAdd}
            addFriend={addFriend}
            userFriends={userFriends}
          />
        )}
        {screenSize.medium > window.innerWidth && (
          <SmallDeviceView showUser={showUsers} />
        )}
      </div>
    </MainLayout>
  );
};

export default Chats;
