import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScriptTag from 'react-script-tag';


export default function TokenInformation(props) {
  const { symbol } = useParams();

  useEffect(() => {
    console.log(symbol);
  }, []);

  return (
    <div className="token-info-page">
      <h1>{`${symbol} Information`}</h1>
      <div> middle section</div>
      <div> <ScriptTag type="text/javascript" src = {`https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=${symbol}&tsyms=USD,EUR,CNY,GBP`}/></div>
    </div>
  );
}

