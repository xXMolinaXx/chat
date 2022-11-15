import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import ModalBase from "../../components/atoms/ModalBase";
const { Meta } = Card;

const MediumDeviceView = ({ showModal, setshowModal }) => {
  return (
    <>
      <div className="my-container bg-white rounded-l m-3 drop-shadow-xl">
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
        <div className="centerHorizontalVertical">
          {false ? (
            <Card
              hoverable
              className="rounded m-3 drop-shadow-xl h-52"
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
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          ) : (
            <p className="text-center">No tienes ninguna conversacion</p>
          )}
        </div>
      </div>
      <div className=" bg-white rounded-l m-3 drop-shadow-xl">1</div>
      {showModal && (
        <ModalBase
          titulo="agregar amigo"
          onclose={() => {
            setshowModal(false);
          }}
        >
          <div className="p-5 flex flex-col ">
            <Input className="my-2" placeholder="nombre de amigo" />
            <Button className="my-2" >Agregar amigos</Button>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default MediumDeviceView;
