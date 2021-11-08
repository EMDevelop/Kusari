import React, { useState } from 'react';
import axios from 'axios';
import DataTable from '../../dataTable/DataTable';
import Dropdown from '../../dropdown/Dropdown';
import LamboLoader from '../../lamboLoader/LamboLoader';
import Snackbar from '../../snackbar/Snackbar';

export default function SearchWalletBalance() {
  const [address, setAddress] = useState(undefined);
  const [walletDetails, setWalletDetails] = useState([]);
  const [walletType, setwalletType] = useState(undefined);
  const [fetchingAddressInfo, setFetchingAddressInfo] = useState(false);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  // Handle button click when a user searches for their waller
  const handleButtonClick = async () => {
    try {
      setFetchingAddressInfo(true);
      await getWalletDetails(address);
      // Commented out to pause loop:
      // getPricesEveryThirtySecondInterval();
      setFetchingAddressInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Logic to request new prices every 30 seconds and re-define the state of the wallet details
  const getPricesEveryThirtySecondInterval = async () => {
    console.log(`I just ran: ${new Date()}`);
    await getWalletDetails(address);
    setTimeout(getPricesEveryThirtySecondInterval, 30000);
  };

  // Axios API call to get the wallet details
  const getWalletDetails = async (address) => {
    const response = await axios.get(
      `/${walletType.toLowerCase()}/wallet-balance/${address}/`
    );
    setWalletDetails(response.data);
    console.log(response.data);
  };

  // Get Prices, pass in current stored wallet details, return new prices
  const getUpdatedPricesForCurrentWallet = async () => {
    // Check if there are currently any tokens in the wallet
    console.log('oitside');
    if (walletDetails.length > 0) {
      console.log('Inside If');
      // If there are, get the prices for each token
      const response = await axios.get(`prices/update-wallet-prices`, {
        params: {
          tokens: JSON.stringify(walletDetails),
        },
      });
      console.log(response);
    }
  };

  const message = 'One moment please. Fetching prices.';
  const handleClick = () => {
    this.props.enqueueSnackbar(message, {
      variant: 'default',
    });
  }

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
          {fetchingAddressInfo ? (
            <LamboLoader />
          ) : (
            <i
              className="fa fa-search"
              aria-hidden="true"
              onClick={() => handleButtonClick()}
            ></i>
          )}
        </div>
      </div>
      <DataTable
        headers={[
          '',
          'Symbol',
          'Token Name',
          'Quantity',
          'Price',
          'Current Value',
        ]}
        rowData={walletDetails}
      />
    </div>
  );
}