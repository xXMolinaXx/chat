import { Avatar, Badge, Button, Card, Col, Input, Row, Tooltip } from "antd";
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
    <Row gutter={10}>
      {/* online user  */}
      <Col md={8} sm={24} className="gutter-row">
        <div className="bg-white rounded-lg drop-shadow-xl ">
          <div className="p-5">
            <p>usuario online: {totalUserConected}</p>
          </div>
          <div className="overflow-y-auto p-5 md:max-h-[500px] lg:max-h-[700px] md:min-h-[300px] lg:min-h-[500px] ">
            {userFriends.length > 0 ? (
              userFriends.map((friend) => (
                <Badge key={friend._id} count={10} className="w-full">
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
                      description={`${friend.description.substring(
                        0,
                        100
                      )} ...`}
                    />
                  </Card>
                </Badge>
              ))
            ) : (
              <p className="text-center">No tienes ninguna conversacion</p>
            )}
          </div>
        </div>
      </Col>
      {/* message box */}
      <Col md={15} sm={24} className="gutter-row ">
        <div className="bg-white rounded-lg  drop-shadow-xl flex flex-col-reverse md:max-h-[500px] lg:max-h-[700px] md:min-h-[300px] lg:min-h-[500px]">
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
                disabled={!userTochat ? true : false}
                className="mx-5"
                type="ghost"
                shape="circle"
                icon={<SendOutlined />}
              />
            </Tooltip>
          </div>
          <div className="p-10 container flex flex-col-reverse overflow-y-auto md:h-[300px] lg:h-[400px] ">
            {activeMessage &&
              activeMessage.message.reverse().map(({ message, userId, sendAtd }) => {
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
          <p className="p-4 font-bold">
            {userTochat && `${userTochat?.name} ${userTochat?.lastName}`}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default MediumDeviceView;
