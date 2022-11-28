import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/userContext";
import { notification } from "antd";
import { my_fetch } from "../../utils/fetch";
import MainLayout from "../layouts/MainLayout";
import { screenSize } from "../../const/screensize";
import SmallDeviceView from "./SmallDeviceView";
import MediumDeviceView from "./MediumDeviceView";

const Chats = () => {
  const { userLogged } = useContext(UserContext);
  const [showModal, setshowModal] = useState(false);
  const [userNameAdd, setuserNameAdd] = useState("");
  const [userFriends, setuserFriends] = useState([]);
  const [showUsers, ] = useState(true);
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

  return (
    <MainLayout>
      <div className="h-full grid-container ">
        {screenSize.medium < window.innerWidth && (
          <MediumDeviceView
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
