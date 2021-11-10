import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Credit to: https://codepen.io/nikhil8krishnan/details/WvYPvv

export default function DataTable(props) {
  const [itemsToFilter, setItemsToFilter] = useState([]);
  const [filteredData, setFilteredData] = useState(props.rowData);
  const [tickZeroBalance, setTickZeroBalance] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    filterRowData('USDperUnit');
  }, [props.rowData, tickZeroBalance]);

  const filterRowData = (filterOn) => {
    if (props.rowData) {
      setFilteredData(
        props.rowData.filter(
          (element) => !itemsToFilter.includes(element[filterOn])
        )
      );
    }
  };

  // Reusable function to add item to filtered list
  const addItemToitemsToFilter = (item) => {
    if (!itemsToFilter.includes(item)) {
      setItemsToFilter([...itemsToFilter, item]);
    }
  };

  // reusable function to remove item from filtered list
  const removeItemFromitemsToFilter = (item) => {
    const values = [...itemsToFilter];
    const index = itemsToFilter.indexOf(item);

    values.splice(index, 1);
    setItemsToFilter(values);
  };

  const handleRowClick = (event, token) => {
    navigate(`/token/${token}`);
  };

  const handleTickZeroBalance = () => {
    tickZeroBalance === true
      ? removeItemFromitemsToFilter('N/A')
      : addItemToitemsToFilter('N/A');
    setTickZeroBalance(!tickZeroBalance);
  };

  const lookupWalletTableData = (
    <>
      {filteredData && (
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {console.log(filteredData)}
            {filteredData.map((row) => {
              return (
                <tr
                  className="data-row"
                  onClick={(e) => handleRowClick(e, row['token'])}
                >
                  <td>
                    <img
                      className="token-icon"
                      src={row['image']}
                      alt={row['token']}
                    />
                  </td>
                  <td>{row['token']}</td>
                  <td>{row['name']}</td>
                  <td>{row['quantity']}</td>
                  <td>
                    {row['USDperUnit'] === 'N/A'
                      ? '-'
                      : `$${row['USDperUnit']}`}
                  </td>
                  <td>
                    {row['BalanceInUSD'] === 'N/A'
                      ? '-'
                      : `$${row['BalanceInUSD']
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );

  const portfolioTableData = <></>;

  return (
    <div>
      <div className="filter-container">
        <div className="filter zero-value">
          <p className="filter-text">Hide Zero Balance</p>
          <input
            type="checkbox"
            id="switch"
            onChange={() => handleTickZeroBalance()}
          />
        </div>
      </div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {props.headers.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        {props.label === 'portfolio'
          ? portfolioTableData
          : lookupWalletTableData}
      </div>
    </div>
  );
}
