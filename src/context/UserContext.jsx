
import { Children, createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const [loggedIn,setIsLoggedIn] = useState(false);

    const [searchedUserData,setSearchedUserData] = useState(null);

    const value = {

        userData,
        setUserData,
        loggedIn,
        setIsLoggedIn,
        searchedUserData,
        setSearchedUserData,
    }
    return (

        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )

}

