import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../dataTable/DataTable';
import { GlobalContext } from '../../../context/globalContext';
import axios from 'axios';

export default function TopCoins() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(`prices/top-coins/`);
        setItems(response.data);
        setIsLoaded(true);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoaded ? (
    <div className="top-coins-page">
      <h1>Top Coins</h1>
      <div>
        <div className="top-coins-page">
          <DataTable
            headers={['Icon', 'symbol', 'token name', 'market cap']}
            rowData={items}
            label="topCoins"
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
