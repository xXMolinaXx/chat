import React, { useContext } from "react";
import { Layout, Menu } from "antd";

import { UserContext } from "../../hooks/userContext";
import logo from "../../extras/img/chat2.png";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const { userLogged } = useContext(UserContext);
  const items1 = [
    <img src={logo} alt="logo" className="my-3 h-8 w-8" />,
    <Link to={`/settings/${userLogged?._id}`}>{userLogged?.name}</Link>,
  ].map((key) => ({
    key,
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
