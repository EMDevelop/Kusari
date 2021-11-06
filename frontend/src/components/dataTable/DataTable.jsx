import React, { useState } from 'react';

// Credit to: https://codepen.io/nikhil8krishnan/details/WvYPvv

export default function DataTable(props) {
  const [filteredList, setFilteredList] = useState([]);

  // Related to the zero balance ticker
  const [tickZeroBalance, setTickZeroBalance] = useState(false);
  const handleTickZeroBalance = () => {
    tickZeroBalance === false
      ? addItemToFilteredList(0)
      : removeItemFromFilteredList(0);

    setTickZeroBalance(!tickZeroBalance);
  };

  // Reusable function to add item to filtered list
  const addItemToFilteredList = (item) => {
    if (!filteredList.includes(item)) {
      setFilteredList([...filteredList, item]);
    }
  };

  // reusable function to remove item from filtered list
  const removeItemFromFilteredList = (item) => {
    console.log('hello');
    const values = [...filteredList];
    const index = filteredList.indexOf(item);

    values.splice(index, 1);
    setFilteredList(values);
  };

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
        {props.rowData && (
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {/* Loop through all rows returned from SearchWalletBalance get request */}
              {props.rowData.map((row) => {
                console.log(row);
                return (
                  <tr>
                    {/* Add data into column for current row */}
                    {Object.keys(row).map((key) => {
                      return <td>{row[key]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
