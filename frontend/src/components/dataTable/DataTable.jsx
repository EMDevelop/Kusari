import React from 'react';

// Credit to: https://codepen.io/nikhil8krishnan/details/WvYPvv

export default function DataTable(props) {
  return (
    <div>
      <h1>My Balance</h1>
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
              {/* [
    {
        "token": "BONDLY",
        "balance": 993.3971165225804,
        "name": "Bondly Token",
        "USDperUnit": 0.06291,
        "BalanceInUSD": 62.494612600435524
    },
    {
        "token": "BSJ",
        "balance": 50,
        "name": "BASENJI",
        "USDperUnit": "N/A",
        "BalanceInUSD": "N/A"
    }
] */}
              {props.rowData.map((row) => {
                console.log(row);
                // row = {token: 'BSJ', balance: 50, name: 'BASENJI', USDperUnit: 'N/A', BalanceInUSD: 'N/A'}
                return (
                  <tr>
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
