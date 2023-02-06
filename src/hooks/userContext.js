import React, { useEffect, useState } from "react";
import { getValueLocalStorage, userLoggedKeyName } from "../utils/localStorage";
export const UserContext = React.createContext();
export const UserContextComponent = ({ children }) => {
  const [userLogged, setUserLogged] = useState({});
  const [loadingUser, setloadingUser] = useState(true);
  useEffect(() => {
    const value = getValueLocalStorage(userLoggedKeyName);
    setUserLogged(value);
    setloadingUser(false);
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
