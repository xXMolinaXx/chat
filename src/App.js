import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatingView, NotFound } from "./views";
import CreateUser from "./views/CreateUser/CreateUser";
import "./styles.css";
import { UserContext, UserContextComponent } from "./hooks/userContext";
import GridExample from "./views/gridExample/GridExample";
import React,{ useContext } from "react";
import "antd/dist/antd.css";
function App() {
  const { userLogged } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/grid" element={<GridExample />} />
        <Route path="*" element={<NotFound />} />
        {userLogged._id && (
          <>
            <Route path="/chats" element={<ChatingView />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
const Router = () => {
  return (
    <UserContextComponent>
      <App />
    </UserContextComponent>
  );
};

export default Router;
