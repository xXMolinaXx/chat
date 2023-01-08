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
socket.on("connect_error", (mensaje) => {
  console.log("Error en conexion:", mensaje);
});
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
// // We also register a catch-all listener, which is very useful during development:
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });
const Chats = () => {
  const { userLogged } = useContext(UserContext);
  const [showModal, setshowModal] = useState(false);
  const [userNameAdd, setuserNameAdd] = useState("");
  const [userFriends, setuserFriends] = useState([]);
  const [showUsers] = useState(true);
  const [message, setmessage] = useState("");
  const [myMessage] = useState("");
  const [activeMessage, setactiveMessage] = useState([]);
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
  socket.on("peopleConnected", ({ amountConnected, dataUserConnected }) => {
    settotalUserConected(dataUserConnected.length);
    setuserFriends(dataUserConnected.filter((el) => el.idSocket !== socket.id));
  });
  socket.on("transfering messages", (message) => {
    setactiveMessage(message);
  });
  useEffect(() => {
    socket.auth = { ...userLogged };
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [userLogged]);
  // useEffect(() => {
  //   // if (userTochat)
  //   //   socket.emit("active chat connection", {
  //   //     userTochat,
  //   //     userLogged: { ...userLogged, socketId: socket.id },
  //   //   });
  //   socket.emit("identity", 2023, (value) => {
  //     console.log("respuesta", value);
  //   });
  // }, [userTochat]);
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
  }, []);*/
  // socket.on("connect", () => {
  //   console.log(socket.id);
  //   console.log("estado del socket =>", socket.connected);
  // });
  return (
    <MainLayout>
      <div className="max-w-full">
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
          userFriends={userFriends}
        />
      </div>
    </MainLayout>
  );
};

export default Chats;
