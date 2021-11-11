import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [walletDetails, setWalletDetails] = useState([]);
  const [address, setAddress] = useState(undefined);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(props.rowData);
  const [portfolioTokens, setPortfolioTokens] = useState(undefined);

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
        portfolioTokens,
        setPortfolioTokens,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
