import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

////////////////////////////////////////////
import { ChatingView, NotFound } from "./views";
import CreateUser from "./views/CreateUser/CreateUser";
import { UserContext, UserContextComponent } from "./hooks/userContext";
import GridExample from "./views/gridExample/GridExample";
import UserSetting from "./views/UserSetting/UserSetting";
import "./styles.css";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7zFiWHVrI6yHyj2JeEJW-GBKjQ4b4pOY",
  authDomain: "chat-hn-85a02.firebaseapp.com",
  projectId: "chat-hn-85a02",
  storageBucket: "chat-hn-85a02.appspot.com",
  messagingSenderId: "931162868513",
  appId: "1:931162868513:web:8820065a542612e6924c60"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

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
