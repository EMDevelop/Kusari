import React, { useState } from 'react';
import axios from 'axios';
import DataTable from '../../dataTable/DataTable';
import Dropdown from '../../dropdown/Dropdown';

export default function SearchWalletBalance() {
  const [address, setAddress] = useState(undefined);
  const [walletDetails, setWalletDetails] = useState(undefined);
  const [walletType, setwalletType] = useState(undefined);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  // Handle button click when a user searches for their waller
  const handleButtonClick = async () => {
    try {
      await getWalletDetails(address);
      // Commented out to pause loop:
      // getPricesEveryThirtySecondInterval();
    } catch (error) {
      console.log(error);
    }
  };

  // Axios API call to get the wallet details
  const getWalletDetails = async (address) => {
    const response = await axios.get(
      `/${walletType.toLowerCase()}/wallet-balance/${address}/`
    );
    setWalletDetails(response.data);
  };

  // Logic to request new prices every 30 seconds and re-define the state of the wallet details
  const getPricesEveryThirtySecondInterval = async () => {
    console.log(`I just ran: ${new Date()}`);
    await getWalletDetails(address);
    setTimeout(getPricesEveryThirtySecondInterval, 30000);
  };

  return (
    <div className="lookup-wallet-container">
      <h1>Lookup Wallet</h1>
      <div className="address-input-form">
        <Dropdown
          placeholderValue="Select wallet type"
          dropdownOptions={['Ethereum', 'Bitcoin']}
          handleOptionSelect={setwalletType}
        />
        <input
          type="text"
          className="search-wallet-input-field"
          placeholder="e.g 0x0613Cd2076bd432C7A60a1b926b11B17BaAaFE11"
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
    </div>
  );
}
