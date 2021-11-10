import React, { useEffect, useContext, useState } from 'react';
import DataTable from '../../dataTable/DataTable';
import { GlobalContext } from '../../../context/globalContext';
import axios from 'axios';

export default function Portfolio() {
  const { userID } = useContext(GlobalContext);
  const [portfolioTokens, setPortfolioTokens] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`multi/user-portfolio/${userID}/`);
        const sortedData = convertDataForDataTable(response.data);
        setPortfolioTokens(sortedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // To re-use the Datatable, we need to standardise data
  const convertDataForDataTable = (data) => {
    const newArray = [];
    data.forEach((address) => {
      JSON.parse(address['content']).forEach((originalData) => {
        newArray.push({
          type: address['type'],
          address: address['address'],
          token: originalData['token'],
          name: originalData['name'],
          quantity: originalData['quantity'],
          contract_address: originalData['contract_address'],
          USDperUnit: originalData['USDperUnit'],
          image: originalData['image'],
          BalanceInUSD: originalData['BalanceInUSD'],
        });
      });
    });
    return newArray;
  };

  return (
    <div className="portfolio-page">
      <h1>My Portfolio</h1>
      <div>
        <p>This is going to be 2x dropdowns</p>
      </div>
      <div className="portfolio-table">
        <DataTable
          headers={[
            // props.headers
            'Type',
            'Address',
            'Icon',
            'Symbol',
            'Token Name',
            'Quantity',
            'Price',
            'Current Value',
          ]}
          rowData={portfolioTokens} // props.rowData
          label="portfolio" // props.label
        />
      </div>
    </div>
  );
}
