import React, { useState } from 'react';
import './styles/App.scss';
import axios from 'axios';

// Components
import Navbar from './components/navbar/Navbar';
import CryptoTokenBalance from './components/cards/cryptoTokenBalance/CryptoTokenBalance';
import DataTable from './components/dataTable/DataTable';


function App() {
  const [address, setAddress] = useState('');

  const handleInputChange = (e) => {
    setAddress(e);
  };
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`/ethereum/wallet-balance/${address}/`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

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
        {/* <div className="token-list">
          {array.map(() => {
            return <CryptoTokenBalance />;
          })}
        </div> */}
        <DataTable />
      </main>
    </div>
  );
}

export default App;
