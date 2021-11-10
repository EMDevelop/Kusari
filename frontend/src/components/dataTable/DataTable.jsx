import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Credit to: https://codepen.io/nikhil8krishnan/details/WvYPvv

export default function DataTable(props) {
  const [itemsToFilter, setItemsToFilter] = useState([]);
  const [filteredData, setFilteredData] = useState(props.rowData);
  const [tickZeroBalance, setTickZeroBalance] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.label === 'portfolio' || props.data === 'lookupWallet') {
      setItemsToFilter('USDperUnit');
      setFilteredData(props.rowData);
    }
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

  const abbreviateAddress = (address) => {
    return (
      address.substring(0, 4) + ' ... ' + address.substring(address.length - 4)
    );
  };

  const walletTokenRowData = (
    <>
      {(props.label === 'portfolio' || props.data === 'lookupWallet') &&
        filteredData && (
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {filteredData.map((row) => {
                return (
                  <tr
                    className="data-row"
                    onClick={(e) => handleRowClick(e, row['token'])}
                  >
                    {props.label === 'portfolio' && (
                      <>
                        <td>{row['type']}</td>
                        <td>{abbreviateAddress(row['address'])}</td>
                      </>
                    )}
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

  const percentageChange = (percentage) => {
    percentage = percentage.toFixed(2);
    return percentage > 0 ? (
      <td>
        <div className="fa-home-up">
          <FontAwesomeIcon icon={faArrowUp} />
          {percentage}
        </div>
      </td>
    ) : (
      <td>
        <div className="fa-home-down">
          <FontAwesomeIcon icon={faArrowDown} />
          {percentage * -1}
        </div>
      </td>
    );
  };

  const topCoinsRowData = props.label === 'topCoins' && props.rowData && (
    <>
      <table cellPadding="0" cellSpacing="0" border="0">
        <tbody>
          {console.log(props.rowData)}
          {props.rowData.map((row) => {
            return (
              <tr
                className="data-row"
                onClick={(e) => handleRowClick(e, row['symbol'])}
              >
                <td>
                  <img
                    className="token-icon"
                    src={row['image']}
                    alt={row['symbol']}
                  />
                </td>
                <td>{row['symbol']}</td>
                <td>{row['name']}</td>
                <td>
                  {'$' +
                    row['current_price']
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
                <td>
                  {'$' +
                    row['market_cap']
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
                {percentageChange(row['price_change_percentage_24h'])}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  return (
    <div>
      {(props.label === 'portfolio' || props.data === 'lookupWallet') && (
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
      )}
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
      <div
        className={
          props.label === 'topCoins' ? 'tbl-content-top-coins' : 'tbl-content'
        }
      >
        {props.label === 'topCoins' ? topCoinsRowData : walletTokenRowData}
      </div>
    </div>
  );
}
