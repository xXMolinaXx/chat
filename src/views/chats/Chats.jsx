import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../hooks/userContext";
import { notification } from "antd";
import MainLayout from "../layouts/MainLayout";
import MediumDeviceView from "./MediumDeviceView";
import { screenSize } from "../../const/screensize";
import SmallDeviceView from "./SmallDeviceView";
import { my_fetch } from "../../utils/fetch";

const socket = io(process.env.REACT_APP_API_URL, { autoConnect: false });
socket.on("connect_error", (mensaje) => {
  console.log("Error en conexion:", mensaje);
});

const Chats = () => {
  const [loadingMessage, setloadingMessage] = useState(false);
  const { userLogged } = useContext(UserContext);
  const [showModal, setshowModal] = useState(false);
  const [userNameAdd, setuserNameAdd] = useState("");
  const [userFriends, setuserFriends] = useState([]);
  const [message, setmessage] = useState("");
  const [myMessage] = useState("");
  const [activeMessage, setactiveMessage] = useState(null);
  const [totalUserConected, settotalUserConected] = useState(0);
  const [userTochat, setuserTochat] = useState(undefined);
  const [windowsInnerWidth, setwindowsInnerWidth] = useState(window.innerWidth);
  const [friendToAdd, setfriendToAdd] = useState(null);
  const handleOnchange = ({ target }) => {
    setfriendToAdd(target.value);
  };
  const readMessage = async (friend) => {
    try {
      setloadingMessage(true);
      setuserTochat(friend);
      const answer = await my_fetch.my_fetch_post(
        `${process.env.REACT_APP_API_URL}/messages`,
        {
          userId: userLogged._id,
          otherUserId: friend._id,
        }
      );
      setactiveMessage(answer);
    } catch (error) {
      //console.log(error);
    }
    setloadingMessage(false);
  };
  const addFriend = () => {
    console.log(friendToAdd);
  };
  function reportWindowSize() {
    setwindowsInnerWidth(window.innerWidth);
  }
  window.addEventListener("resize", reportWindowSize);
  const onKeySendMessage = (event) => {
    if (message === "") return;
    if (event.key === "Enter") {
      socket.emit("chating", {
        userTochat,
        userLogged: { ...userLogged, idSocket: socket.id },
        message: {
          sendAtd: new Date(),
          message: message,
          userId: userLogged._id,
        },
      });
      setmessage("");
    }
  };
  const sendMessage = () => {
    if (message === "") return;
    socket.emit("chating", {
      userTochat,
      userLogged: { ...userLogged, idSocket: socket.id },
      message: {
        sendAtd: new Date(),
        message: message,
        userId: userLogged._id,
      },
    });
    setmessage("");
  };
  socket.on("peopleConnected", ({ amountConnected, dataUserConnected }) => {
    settotalUserConected(dataUserConnected.length);
    setuserFriends(dataUserConnected.filter((el) => el.idSocket !== socket.id));
  });
  socket.on("transfering messages", (message) => {
    setactiveMessage(message);
  });
  socket.io.on("reconnect_attempt", () => {
    notification.info({ message: "se esta intentando reconectar al servidor" });
  });
  socket.io.on("reconnect", () => {
    notification.info({ message: "Se reconecto al servidor" });
  });
  socket.on("disconnect", () => {
    notification.info({ message: "Te desconectastes del servidor" });
  });
  useEffect(() => {
    socket.auth = { ...userLogged };
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [userLogged]);
  return (
    <MainLayout>
      <div className="max-w-full container-scroll">
        {windowsInnerWidth <= screenSize.xs ? (
          <SmallDeviceView
            activeMessage={activeMessage}
            userTochat={userTochat}
            setuserTochat={readMessage}
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
        ) : (
          <MediumDeviceView
            activeMessage={activeMessage}
            userTochat={userTochat}
            setuserTochat={readMessage}
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
            loadingMessage={loadingMessage}
            sendMessage={sendMessage}
            addFriend={addFriend}
            handleOnchange={handleOnchange}
            friendToAdd={friendToAdd}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Chats;
// EVENTO DE CONECT
// socket.on("connect", () => {

// });
/*
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
