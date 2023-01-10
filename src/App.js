import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatingView, NotFound } from "./views";
import CreateUser from "./views/CreateUser/CreateUser";
import "./styles.css";
import { UserContext, UserContextComponent } from "./hooks/userContext";
import GridExample from "./views/gridExample/GridExample";
import React, { useContext } from "react";
import UserSetting from "./views/UserSetting/UserSetting";
function returnComponenete(mainView, secondaryView, user) {
  if (user?._id) return mainView;
  else return secondaryView;
}
function App() {
  const { userLogged } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/grid" element={<GridExample />} />
        <Route
          path="/"
          element={returnComponenete(
            <ChatingView />,
            <CreateUser />,
            userLogged
          )}
        />
        <Route
          path="/chats"
          element={returnComponenete(
            <ChatingView />,
            <CreateUser />,
            userLogged
          )}
        />
        <Route
          path="/settings/:id"
          element={returnComponenete(
            <UserSetting />,
            <CreateUser />,
            userLogged
          )}
        />
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
