import React, { createContext, useState } from 'react';

const MyContext = createContext();


export const MyProvider = ({ children }) => {

  const [pipeline, setPipeline] = useState("");

  const [searchedUserData,setSearchedUserData] = useState(null);

  return (
    <MyContext.Provider value={{ pipeline, setPipeline }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;


