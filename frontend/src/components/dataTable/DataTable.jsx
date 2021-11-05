import React from 'react';

// Credit to: https://codepen.io/nikhil8krishnan/details/WvYPvv

export default function DataTable(props) {
  return (
    <div>
      <h1>Wallet Breakdown</h1>
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
