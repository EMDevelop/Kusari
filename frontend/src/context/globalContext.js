import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [walletDetails, setWalletDetails] = useState([]);
  const [address, setAddress] = useState(undefined);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        walletDetails,
        setWalletDetails,
        address,
        setAddress,
        username,
        setUsername,
        userID,
        setUserID,
        loggedIn,
        setLoggedIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
