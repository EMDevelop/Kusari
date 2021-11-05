import React, { useState } from 'react';
import axios from 'axios';
import DataTable from '../../../components/dataTable/DataTable';

export default function SearchWalletBalance() {
  const [address, setAddress] = useState('');
  const [balanceByTokenObject, setBalanceByTokenObject] = useState(undefined);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  // API call to back end using Axios
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`/ethereum/wallet-balance/${address}/`);
      setBalanceByTokenObject(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="address-input-form">
        <input
          type="text"
          placeholder="address"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div>
          <i
            class="fa fa-search"
            aria-hidden="true"
            onClick={() => handleButtonClick()}
          ></i>
        </div>
      </div>
      <DataTable
        headers={['Symbol', 'Token Name', 'Quantity', 'Price', 'Current Value']}
        rowData={balanceByTokenObject}
      />
    </>
  );
}
