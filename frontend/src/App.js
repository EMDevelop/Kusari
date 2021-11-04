import React, { useState } from 'react';
import './styles/App.scss';
import axios from 'axios';

// Components
import Navbar from './components/navbar/Navbar';
import DataTable from './components/dataTable/DataTable';

function App() {
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
    <div className="app">
      <Navbar />
      <main>
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
          headers={[
            'Symbol',
            'Token Name',
            'Quantity',
            'Price',
            'Current Value',
          ]}
          rowData={balanceByTokenObject}
        />
      </main>
    </div>
  );
}

export default App;
