import React, { useState, useEffect } from 'react';
import DataTable from '../../dataTable/DataTable';
import axios from 'axios';

export default function TopCoins() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(`prices/top-coins/`);
        setItems(response.data.tokens);
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
          {items && (
            <DataTable
              headers={[
                'Icon',
                'symbol',
                'token name',
                'price',
                'market cap',
                '24hr % Change',
              ]}
              rowData={items}
              label="topCoins"
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
