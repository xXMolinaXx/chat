import React, { useContext } from "react";
import { Button, Layout, Menu, notification } from "antd";

import { UserContext } from "../../hooks/userContext";
import logo from "../../extras/img/chat2.png";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  let navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(UserContext);

  const logout = () => {
    setUserLogged({});
    notification.info({ message: "se cerro sesion exitosamente" });
    navigate("/");
  };
  const items1 = [
    <Link to={`/chats`}>
      <img src={logo} alt="logo" className="my-3 h-8 w-8" />
    </Link>,
    <Link to={`/settings/${userLogged?._id}`}>{userLogged?.name}</Link>,
    <Button type="text" className="text-white" onClick={logout}>
      SALIR
    </Button>,
  ].map((key, i) => ({
    key: `nav-bar-element-${i}`,
    label: key,
  }));
  return (
    <Layout
      className=" h-full chatBackground "
      style={{
        minHeight: "100vh",
      }}
    >
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
        <img src={logo} className="my-3 h-8 w-8" />
      </Header>
      <Layout className="site-layout ">
        <Content className="chatBackground ">{children}</Content>
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
