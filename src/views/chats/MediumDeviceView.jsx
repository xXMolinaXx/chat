import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import React, { useContext, useId } from "react";

import AddFriend from "./AddFriend";
import loadingGif from "../../extras/img/progress.gif";
import userIcon from "../../extras/img/user.png";
import { UserContext } from "../../hooks/userContext";
const { Meta } = Card;
const { Paragraph } = Typography;
const MediumDeviceView = ({
  userFriends,
  setmessage,
  message,
  onKeySendMessage,
  totalUserConected,
  setuserTochat,
  userTochat,
  activeMessage,
  loadingMessage,
  sendMessage,
  addFriend,
  handleOnchange,
  friendToAdd,
}) => {
  const { userLogged } = useContext(UserContext);
  return (
    <Row gutter={10} align="middle" justify={"center"}>
      {/* online user  */}
      <Col md={5} sm={24} className="gutter-row">
        <div className="bg-white rounded-lg drop-shadow-xl h-[80vh]">
          <div className="p-5">
            <p>usuario online: {totalUserConected}</p>
            <Button>agregar amigo</Button>
          </div>
          {false ? (
            <AddFriend
              onFinish={addFriend}
              onFinishFailed={() => {}}
              handleOnchange={handleOnchange}
              friendToAdd={friendToAdd}
            />
          ) : (
            <div className="overflow-y-auto p-5  ">
              {userFriends.length > 0 ? (
                userFriends.map((friend) => (
                  <Badge key={friend._id} count={1} className="w-full">
                    <Card
                      hoverable
                      className="drop-shadow-xl"
                      onClick={() => {
                        setuserTochat(friend);
                      }}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            src={
                              friend.profilePoto ? friend.profilePoto : userIcon
                            }
                          />
                        }
                        title={friend.userName}
                        description={
                          <Paragraph ellipsis={{ rows: 2 }}>
                            {friend.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Badge>
                ))
              ) : (
                <p className="text-center">No tienes ninguna conversacion</p>
              )}
            </div>
          )}
        </div>
      </Col>
      {/* message box */}
      <Col md={12} sm={24} className="gutter-row ">
        <div className="bg-white rounded-lg  drop-shadow-xl flex flex-col-reverse h-[80vh]">
          <div className="m-5 flex">
            <Input
              disabled={!userTochat ? true : false}
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
                onClick={sendMessage}
                disabled={!userTochat ? true : false}
                className="mx-5"
                type="ghost"
                shape="circle"
                icon={<SendOutlined />}
              />
            </Tooltip>
          </div>
          <div
            className={`p-10 container flex flex-col-reverse overflow-y-auto h-full container-scroll ${
              loadingMessage && "justify-center items-center"
            }`}
          >
            {loadingMessage && (
              <div>
                <img src={loadingGif} alt="cargando" width={100} />
              </div>
            )}
            {activeMessage &&
              activeMessage.message.map(
                ({ message, userId, sendAtd, _id }, i) => {
                  if (userId !== userLogged._id) {
                    return (
                      <div
                        className="my-container my-5 max"
                        key={`${_id}-${i}`}
                      >
                        <p className="bg-slate-100 shadow-lg max-w-lg rounded-lg  border-2 p-2">
                          {message}
                          <br />
                          <span className="text-[1px]">{sendAtd}</span>
                        </p>
                      </div>
                    );
                  } else if (userId === userLogged._id) {
                    return (
                      <div
                        className="my-container rigthHorizontal my-5 "
                        key={`${_id}-${i}`}
                      >
                        <p className="bg-slate-100 shadow-lg max-w-lg rounded-lg  border-2 p-2">
                          {message}
                          <br />
                          <span className="text-[1px]">{sendAtd}</span>
                        </p>
                      </div>
                    );
                  }
                }
              )}
          </div>
          <p className="p-4 font-bold">
            {userTochat && `${userTochat?.name} ${userTochat?.lastName}`}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default MediumDeviceView;
