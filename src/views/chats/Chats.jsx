import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../hooks/userContext";
import { notification } from "antd";
import { my_fetch } from "../../utils/fetch";
import MainLayout from "../layouts/MainLayout";
import { screenSize } from "../../const/screensize";
import SmallDeviceView from "./SmallDeviceView";
import MediumDeviceView from "./MediumDeviceView";

const socket = io(process.env.REACT_APP_API_URL, { autoConnect: false });
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
socket.on("connect_error", (mensaje) => {
  console.log("Error en conexion:", mensaje);
});
// We also register a catch-all listener, which is very useful during development:
socket.onAny((event, ...args) => {
  console.log(event, args);
});
const Chats = () => {
  const { userLogged } = useContext(UserContext);
  const [showModal, setshowModal] = useState(false);
  const [userNameAdd, setuserNameAdd] = useState("");
  const [userFriends, setuserFriends] = useState([]);
  const [showUsers] = useState(true);
  const [message, setmessage] = useState("");
  const [myMessage, setmyMessage] = useState("");
  const [activeMessage, setactiveMessage] = useState("");
  const [totalUserConected, settotalUserConected] = useState(0);
  const [userTochat, setuserTochat] = useState(undefined);
  const onKeySendMessage = (event) => {
    if (event.key === "Enter") {
      socket.emit("chating", {
        userTochat,
        userLogged: { ...userLogged, socketId: socket.id },
        message: {
          sendAtd: new Date(),
          message: message,
          userId: userLogged._id,
        },
      });
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
  /* useEffect(() => {
    const userConected = (userConected) => {
      settotalUserConected(userConected-1);
    };
    socket.on("user conected", userConected);
    socket.on("receiveMessage", (mensaje) => {
      setmyMessage(mensaje);
    });
    return () => {
      //socket.off("user conected", userConected);
    };
  }, []);
useEffect(() => {
  socket.on("connect", () => {
    console.log(socket.id);
    console.log("estado del socket =>", socket.connected);
  });
  socket.auth = { ...userLogged };
  socket.connect();
}, [])*/
  socket.on("transfering messages", (message) => {
    setactiveMessage(message);
  });
  socket.on("connect", () => {
    console.log(socket.id);
    console.log("estado del socket =>", socket.connected);
  });
  socket.on("peopleConnected", ({ amountConnected, dataUserConnected }) => {
    settotalUserConected(amountConnected);
    setuserFriends(
      dataUserConnected.filter((el) => el.socketId !== socket.id)
    );
  });
  useEffect(() => {
    if (userTochat)
      socket.emit("active chat connection", {
        userTochat,
        userLogged: { ...userLogged, socketId: socket.id },
      });
  }, [userTochat]);
  useEffect(() => {
    socket.auth = { ...userLogged };
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [userLogged]);

  return (
    <MainLayout>
      <div className="h-full grid-container ">
        {screenSize.medium < window.innerWidth && (
          <MediumDeviceView
            activeMessage={activeMessage}
            userTochat={userTochat}
            setuserTochat={setuserTochat}
            totalUserConected={totalUserConected}
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
