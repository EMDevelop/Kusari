import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScriptTag from 'react-script-tag';


export default function TokenInformation(props) {
  const { symbol } = useParams();

  const AllTokenData = () => {
  
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`, requestOptions)
    .then(response => response.json())  
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  }

  useEffect(() => {
    console.log(symbol);
  }, []);

  return (
    <div className="token-info-page">
      <h1>{`${symbol} Information`}</h1>
      <div> {AllTokenData}</div>
      <div> <ScriptTag type="text/javascript" src = {`https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=${symbol}&tsyms=USD,EUR,CNY,GBP`}/></div>
    </div>
  );
}

