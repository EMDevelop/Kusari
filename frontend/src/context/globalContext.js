import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [walletDetails, setWalletDetails] = useState([]);
  const [address, setAddress] = useState(undefined);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(props.rowData);

  return (
    <GlobalContext.Provider
      value={{
        walletDetails,
        setWalletDetails,
        address,
        setAddress,
        loggedInUserName,
        setLoggedInUserName,
        userID,
        setUserID,
        loggedIn,
        setLoggedIn,
        filteredData,
        setFilteredData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
