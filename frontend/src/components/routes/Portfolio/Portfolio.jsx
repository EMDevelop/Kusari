import React, { useEffect, useContext, useState } from 'react';
import DataTable from '../../dataTable/DataTable';
import { GlobalContext } from '../../../context/globalContext';
import axios from 'axios';
import Dropdown from '../../dropdown/Dropdown';
import { useSnackbar } from 'notistack';
import LamboLoader from '../../lamboLoader/LamboLoader';

export default function Portfolio() {
  const { userID, setPortfolioTokens, portfolioTokens } =
    useContext(GlobalContext);
  const [uniqueAddressList, setUniqueAddressList] = useState(undefined);
  const [uniqueTypeList, setUniqueTypeList] = useState(undefined);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setPortfolioTokens(undefined);
        info(
          'My Portfolio: Fetching your wallet details, this may take a minute or so!'
        );
        const response = await axios.get(`multi/user-portfolio/${userID}/`);
        const sortedData = convertDataForDataTable(response.data);
        setPortfolioTokens(sortedData);
        setDropdownlists(sortedData);
        success('My Portfolio: Wallet fetched successfully!');
      } catch (error) {
        fail(
          'My Portfolio: There was a problem with the request! Please try again'
        );
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

  const setDropdownlists = (data) => {
    ['type', 'address'].forEach((filterColumn) => {
      if (filterColumn === 'type') {
        setUniqueTypeList(createListFromDictionary(filterColumn, data));
      } else {
        setUniqueAddressList(createListFromDictionary(filterColumn, data));
      }
    });
  };

  const createListFromDictionary = (column, sortedData) => {
    return sortedData.map((token) => token[column]).filter(onlyUnique);
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

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

  return (
    <div className="portfolio-page">
      <h1>My Portfolio</h1>
      <div className="filter-dropdown-container">
        {!portfolioTokens && <LamboLoader />}
        {uniqueTypeList && (
          <Dropdown
            placeholderValue="Filter: Wallet Type"
            dropdownOptions={uniqueTypeList}
            setSelectedValue={setSelectedType}
            location="portfolio"
          />
        )}
        {uniqueAddressList && (
          <Dropdown
            placeholderValue="Filter: Wallet Address"
            dropdownOptions={uniqueAddressList}
            setSelectedValue={setSelectedAddress}
            location="portfolio"
          />
        )}
      </div>
      <div className="portfolio-table">
        <DataTable
          typeFiler={selectedType}
          addressFilter={selectedAddress}
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
