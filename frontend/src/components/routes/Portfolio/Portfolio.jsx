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
        console.log(response.data[0].content);
        setPortfolioTokens(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
            '',
            'Symbol',
            'Token Name',
            'Quantity',
            'Price',
            'Current Value',
          ]}
          //rowData={portfolioTokens} // props.rowData
          label="portfolio" // props.label
        />
      </div>
    </div>
  );
}
