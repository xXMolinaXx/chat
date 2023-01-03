import { Button, Card, Input, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import userIcon from "../../extras/img/user.png";
import { UserContext } from "../../hooks/userContext";
const { Meta } = Card;

const MediumDeviceView = ({
  showModal,
  setshowModal,
  userNameAdd,
  setuserNameAdd,
  addFriend,
  userFriends,
  setmessage,
  message,
  onKeySendMessage,
  myMessage,
  totalUserConected,
  setuserTochat,
  userTochat,
  activeMessage,
}) => {
  const { userLogged } = useContext(UserContext);
  return (
    <>
      {/* online user  */}
      <div className="bg-white rounded-l m-3 drop-shadow-xl">
        <div className="p-5">
          <p>usuario online: {totalUserConected}</p>
          {/* 
          
          <Button
            type="default"
            size="small"
            onClick={() => {
              setshowModal(true);
            }}
          >
            agregar amigo
          </Button>
          */}
        </div>
        <div className="overflow-y-auto h-[26rem]">
          {userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <Card
                key={friend._id}
                hoverable
                className="rounded m-3 drop-shadow-xl h-52 "
                onClick={() => {
                  setuserTochat(friend);
                }}
                cover={
                  <img
                    className="rounded-xl"
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: "AUTO",
                      marginRight: "AUTO",
                      borderRadius: 100,
                      objectFit: "contain",
                      marginTop: 10,
                    }}
                    alt="example"
                    src={friend.profilePoto ? friend.profilePoto : userIcon}
                  />
                }
              >
                <Meta
                  title={friend.userName}
                  description={friend.description}
                />
              </Card>
            ))
          ) : (
            <p className="text-center">No tienes ninguna conversacion</p>
          )}
        </div>
      </div>
      {/* message box */}
      <div className=" bg-white rounded-l m-3 drop-shadow-xl flex flex-col-reverse">
        <div className="m-5 flex">
          <Input
            placeholder="escribe aqui..."
            className="mx-5"
            value={message}
            onChange={({ target }) => {
              setmessage(target.value);
            }}
            onKeyDown={onKeySendMessage}
          />
          <Tooltip title="enviar">
            <Button
              className="mx-5"
              type="ghost"
              shape="circle"
              icon={<SendOutlined />}
            />
          </Tooltip>
        </div>
        <div className="p-10 container h-full flex flex-col-reverse overflow-y-auto h-[500px]">
          {activeMessage &&
            activeMessage.message.map(({ message, userId, sendAtd }) => {
              if (userId !== userLogged._id) {
                return (
                  <div className="my-container my-5">
                    <p className="bg-slate-100 shadow-lg max-w-lg rounded-lg  border-2 p-2">
                      {message}
                      <br />
                      <span className="text-[1px]">{sendAtd}</span>
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="my-container rigthHorizontal my-5 ">
                    <p className="bg-slate-100 shadow-lg max-w-lg rounded-lg  border-2 p-2">
                      {message}
                      <br />
                      <span className="text-[1px]">{sendAtd}</span>
                    </p>
                  </div>
                );
              }
            })}
        </div>
        
      </div>
      
    </>
  );
};

export default MediumDeviceView;
