import React, { useEffect, useState } from "react";
import { getValueLocalStorage, userLoggedKeyName } from "../utils/localStorage";
export const UserContext = React.createContext();
export const UserContextComponent = ({ children }) => {
  const [userLogged, setUserLogged] = useState({});
  useEffect(() => {
    const value = getValueLocalStorage(userLoggedKeyName);
    setUserLogged(value)
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
