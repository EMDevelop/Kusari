import React, { useState } from 'react';
import axios from 'axios';
import DataTable from '../../dataTable/DataTable';

export default function SearchWalletBalance() {
  const [address, setAddress] = useState(undefined);
  const [walletDetails, setWalletDetails] = useState(undefined);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  // API call to back end using Axios
  const handleButtonClick = async () => {
    try {
      await getWalletDetails(address);
      getPricesEveryThirtySecondInterval();
    } catch (error) {
      console.log(error);
    }
  };

  const getWalletDetails = async (address) => {
    const response = await axios.get(`/ethereum/wallet-balance/${address}/`);
    setWalletDetails(response.data);
  };

  const getPricesEveryThirtySecondInterval = async () => {
    console.log(`I just ran: ${new Date()}`);
    await getWalletDetails(address);
    setTimeout(getPricesEveryThirtySecondInterval, 30000);
  };

  // If on search individual address page
  // start the loop when they click the button
  // If on profile wallet page
  // start the loop when the page loads (or component render)

  return (
    <>
      <h1>Lookup Wallet</h1>
      <div className="address-input-form">
        <input
          type="text"
          placeholder="address"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div>
          <i
            className="fa fa-search"
            aria-hidden="true"
            onClick={() => handleButtonClick()}
          ></i>
        </div>
      </div>
      <DataTable
        headers={['Symbol', 'Token Name', 'Quantity', 'Price', 'Current Value']}
        rowData={walletDetails}
      />
    </>
  );
}
