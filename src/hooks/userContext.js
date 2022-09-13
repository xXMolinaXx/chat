import React, { useState } from "react";
export const UserContext = React.createContext();
export const UserContextComponent = ({ children }) => {
    const [userLogged, setUserLogged] = useState({});
    return (
        <UserContext.Provider value={{ userLogged, setUserLogged }}>
            {children}
        </UserContext.Provider>
    )
};
