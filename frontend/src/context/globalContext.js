import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [walletDetails, setWalletDetails] = useState([]);
  const [address, setAddress] = useState(undefined);

  return (
    <GlobalContext.Provider
      value={{
        walletDetails,
        setWalletDetails,
        address,
        setAddress,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
