import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DataTable from '../../dataTable/DataTable';
import Dropdown from '../../dropdown/Dropdown';
import LamboLoader from '../../lamboLoader/LamboLoader';
import { useSnackbar } from 'notistack';
import { GlobalContext } from '../../../context/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchWalletBalance() {
  const [walletType, setwalletType] = useState(undefined);
  const [fetchingAddressInfo, setFetchingAddressInfo] = useState(false);
  const { address, setAddress, walletDetails, setWalletDetails } =
    useContext(GlobalContext);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  const { enqueueSnackbar } = useSnackbar();

  const success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  const fail = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  const info = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
    });
  };

  useEffect(() => {
    info(
      'Select the wallet type, paste your wallet address and click the search icon'
    );
  }, []);

  // Handle button click when a user searches for their waller
  const handleButtonClick = async () => {
    try {
      info(
        'Lookup Wallet: Fetching your wallet details, this may take a minute or so!'
      );
      setFetchingAddressInfo(true);
      await getWalletDetails(address);
      setFetchingAddressInfo(false);
      success('Fetching complete');
    } catch (error) {
      fail(
        'Lookup Wallet: There was a problem with the request! Please try again'
      );
      console.log(error);
    }
  };

  // Axios API call to get the wallet details
  const getWalletDetails = async (address) => {
    try {
      const response = await axios.get(
        `/${walletType.toLowerCase()}/wallet-balance/${address}/single`
      );
      setWalletDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUpdateWallet = async () => {
      console.log(walletDetails);
      if (walletDetails.length > 0) {
        try {
          const response = await axios.get(`prices/update-wallet-prices`, {
            params: {
              tokens: JSON.stringify(walletDetails),
            },
          });
          console.log();
          setWalletDetails(response.data.updated_tokens);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (walletDetails.length > 0) {
      const timer = setInterval(() => getUpdateWallet(), 30000);
      return () => clearInterval(timer);
    }
  }, [walletDetails]);

  return (
    <div className="lookup-wallet-container">
      <h1>Lookup Wallet</h1>
      <div className="address-input-form">
        <Dropdown
          location="lookupWallet"
          placeholderValue="Select wallet type"
          dropdownOptions={['Ethereum', 'Bitcoin', 'BSC']}
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
            <div className="fa-home" onClick={() => handleButtonClick()}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          )}
        </div>
      </div>
      <DataTable
        headers={[
          'Icon',
          'Symbol',
          'Token Name',
          'Quantity',
          'Price',
          'Current Value',
        ]}
        rowData={walletDetails}
        label="lookupWallet"
      />
    </div>
  );
}
