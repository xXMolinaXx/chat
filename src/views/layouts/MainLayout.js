import React, { useContext } from "react";
import { Layout, Menu, notification } from "antd";

import { UserContext } from "../../hooks/userContext";
import logo from "../../extras/img/chat.png";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedKeyName } from "../../utils/localStorage";
const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  let navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(UserContext);

  const logout = () => {
    setUserLogged({});
    localStorage.clear(userLoggedKeyName);
    notification.info({ message: "se cerro sesion exitosamente" });
    navigate("/");
  };
  const items = [
    <Link to={`/chats`}>
      <img src={logo} alt="logo" className="my-3 h-8 w-8" />
    </Link>,
    <Link to={`/settings/${userLogged?._id}`}>{`mi Perfil (${userLogged?.name}) `}</Link>,
    <div onClick={logout}>
      cerrar sesion
    </div>,
  ].map((key, i) => ({
    key: `nav-bar-element-${i}`,
    label: key,
  }));
  return (
    <Layout className="chatBackground min-h-screen">
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Header>
      <Layout className="site-layout ">
        <Content className="chatBackground p-3">{children}</Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
