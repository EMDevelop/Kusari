import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScriptTag from 'react-script-tag';

import axios from 'axios';
import LamboLoader from '../../lamboLoader/LamboLoader';

export default function TokenInformation(props) {
  const { symbol } = useParams();

  const [tokenData, setTokenData] = useState(new Set());
  const [graphData, setGraphData] = useState('');

  useEffect(() => {
    async function allTokenData() {
      try {
        const response = await axios.get(`/prices/coin-info/${symbol}/`);
        const fetchedTokens =
          response.data['tokens'].DISPLAY[symbol.toUpperCase()]['USD'];
        setTokenData(fetchedTokens);
        setupGraph();
      } catch (error) {
        console.log(error);
      }
    }
    allTokenData();
  }, []);

  const setupGraph = () => {
    setGraphData(
      `https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=${symbol}&tsyms=USD,EUR,CNY,GBP`
    );
  };

  return (
    <div className="token-info-page">
      <div>
        <h1>{`${symbol} Information`}</h1>
        <p className="coming-from">Data Source: CryptoCompare.com</p>
      </div>

      <div class="token-info-container">
        <div class="stock">
          <span class="symbol">Price USD</span>
          <span class="change">{tokenData['PRICE']}</span>
        </div>

        <div class="stock">
          <span class="symbol">24 Hour Change</span>
          <span class="change">{tokenData['CHANGE24HOUR']}</span>
        </div>

        <div class="stock">
          <span class="symbol">24 Hour % Change</span>
          <span class="change">{tokenData['CHANGEPCT24HOUR']}%</span>
        </div>

        <div class="stock">
          <span class="symbol">Daily % Change</span>
          <span class="change">{tokenData['CHANGEPCTDAY']}%</span>
        </div>

        <div class="stock">
          <span class="symbol">Hourly Change</span>
          <span class="change">{tokenData['CHANGEHOUR']}</span>
        </div>

        <div class="stock">
          <span class="symbol">Change % Hour</span>
          <span class="change">{tokenData['CHANGEPCTHOUR']}%</span>
        </div>

        <div class="stock">
          <span class="symbol">Market Cap</span>
          <span class="change">{tokenData['MKTCAP']}</span>
        </div>

        <div class="stock">
          <span class="symbol">Day High</span>
          <span class="change">{tokenData['HIGHDAY']}</span>
        </div>
      </div>
      <div>
        <ScriptTag
          crossOrigin="anonymous"
          type="text/javascript"
          src={graphData}
        />
      </div>
    </div>
  );
}
