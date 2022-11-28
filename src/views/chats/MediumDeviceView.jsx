import { Button, Card, Input } from "antd";
import React from "react";
import ModalBase from "../../components/atoms/ModalBase";
import userIcon from '../../extras/img/user.png'
const { Meta } = Card;

const MediumDeviceView = ({
  showModal,
  setshowModal,
  userNameAdd,
  setuserNameAdd,
  addFriend,
  userFriends,
}) => {
  return (
    <>
      <div className="bg-white rounded-l m-3 drop-shadow-xl">
        <div className="p-5">
          <Button
            type="default"
            size="small"
            onClick={() => {
              setshowModal(true);
            }}
          >
            agregar amigo
          </Button>
        </div>
        <div >
          {userFriends.length > 0 ? userFriends.map(friend=>(
            <Card
              key={friend._id}
              hoverable
              className="rounded m-3 drop-shadow-xl h-52 "
              onClick={()=>{}}
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
                  src={friend.profilePoto ? friend.profilePoto :userIcon}
                />
              }
            >
              <Meta
                title={friend.userName}
                description={friend.description}
              />
            </Card>
          ))  
          : (
            <p className="text-center">No tienes ninguna conversacion</p>
          )}
        </div>
      </div>
      <div className=" bg-white rounded-l m-3 drop-shadow-xl flex flex-col-reverse">
        <div className="bg-black">1</div>
        <div className="bg-black">1</div>
      </div>
      {showModal && (
        <ModalBase
          titulo="agregar amigo"
          onclose={() => {
            setshowModal(false);
          }}
        >
          <div className="p-5 flex flex-col ">
            <Input
              className="my-2"
              placeholder="nombre de amigo"
              value={userNameAdd}
              onChange={({ target }) => {
                setuserNameAdd(target.value);
              }}
            />
            <Button className="my-2" onClick={addFriend}>Agregar amigos</Button>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default MediumDeviceView;
