import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

////////////////////////////////////////////
import loadingGif from "./extras/img/loading.gif";
import { UserContext, UserContextComponent } from "./hooks/userContext";
import {
  BlogsView,
  GridView,
  BlogFormView,
  UserSettingView,
  ChatingView,
  NotFound,
  CreateUserView
} from "./views";
import "./styles.css";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7zFiWHVrI6yHyj2JeEJW-GBKjQ4b4pOY",
  authDomain: "chat-hn-85a02.firebaseapp.com",
  projectId: "chat-hn-85a02",
  storageBucket: "chat-hn-85a02.appspot.com",
  messagingSenderId: "931162868513",
  appId: "1:931162868513:web:8820065a542612e6924c60",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

function returnComponenete(mainView, secondaryView, user, loadingUser) {
  if (loadingUser) {
    return (
      <div className="flex justify-center align-middle">
        <img src={loadingGif} alt="cargando" />
      </div>
    );
  }
  if (user?._id) return mainView;
  else return secondaryView;
}
function App() {
  const { userLogged, loadingUser } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={returnComponenete(
            <ChatingView />,
            <CreateUserView />,
            userLogged
          )}
        />
        <Route
          path="/chats"
          element={returnComponenete(
            <ChatingView />,
            <CreateUserView />,
            userLogged,
            loadingUser
          )}
        />
        <Route
          path="/settings/:id"
          element={returnComponenete(
            <UserSettingView />,
            <CreateUserView />,
            userLogged,
            loadingUser
          )}
        />
        <Route
          path="/blogs"
          element={returnComponenete(
            <BlogsView />,
            <CreateUserView />,
            userLogged,
            loadingUser
          )}
        />
        <Route
          path="/blogForm"
          element={returnComponenete(
            <BlogFormView />,
            <CreateUserView />,
            userLogged,
            loadingUser
          )}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/grid" element={<GridView />} />
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
