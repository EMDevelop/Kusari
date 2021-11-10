import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScriptTag from 'react-script-tag';

import axios from 'axios';


export default function TokenInformation(props) {
  const { symbol } = useParams();
  
  const [tokenData, setTokenData] = useState(undefined)

useEffect(() => {
  async function allTokenData() {
      try {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`)
        setTokenData(response.data.DISPLAY[symbol]['USD'])
      } catch (error) {
        console.log(error)
      }
  }
  allTokenData()
}, [])


console.log(tokenData)
const tokenChange = Object.fromEntries(Object.entries(tokenData).filter(([key]) => key.includes('CHANGE')))
console.log(tokenChange)

for (const [key, value] of Object.entries(tokenData)) {
  console.log(`${key}: ${value}`);
}
  
  return (
    <div className="token-info-page">

      <div class="container">
      <h1>{`${symbol} Information`}</h1>

      <div class="stock">
        <span class="symbol">Price USD</span>
        <span class="change">{tokenData.PRICE}</span>
      </div>

      <div class="stock">
        <span class="symbol">24 Hour Change</span>
        <span class="change">{tokenData.CHANGE24HOUR}</span>
      </div>

      <div class="stock">
        <span class="symbol">24 Hour % Change</span>
        <span class="change">{tokenData.CHANGEPCT24HOUR}%</span>
      </div>

      <div class="stock">
        <span class="symbol">Daily % Change</span>
        <span class="change">{tokenData.CHANGEPCTDAY}%</span>
      </div>

      <div class="stock">
        <span class="symbol">Hourly Change</span>
        <span class="change">{tokenData.CHANGEHOUR}</span>
      </div>

      <div class="stock">
        <span class="symbol">Change % Hour</span>
        <span class="change">{tokenData.CHANGEPCTHOUR}%</span>
      </div>

      <div class="stock">
        <span class="symbol">Market Cap</span>
        <span class="change">{tokenData.MKTCAP}</span>
      </div>

      <div class="stock">
        <span class="symbol">Day High</span>
        <span class="change">{tokenData.HIGHDAY}</span>
      </div>
      

      </div>

      {/* <div className="token-granular">
        {tokenData &&  Object.entries(tokenData).map(([key,value]) => {
            return (
              <>
              <div class="stock" id="key">
              <span className="token-key"> {key}</span> 
              <span className="token-value"> {value}</span> 
              </div>
              </>
            )
        })}
      </div> */}
    
      {/* <div> <ScriptTag type="text/javascript" src = {`https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=${symbol}&tsyms=USD,EUR,CNY,GBP`}/></div> */}
    </div>
  );
}

