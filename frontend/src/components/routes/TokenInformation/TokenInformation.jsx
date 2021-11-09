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


  useEffect(() => {
    console.log(symbol);
  }, []);

  return (
    <div className="token-info-page">
      <h1>{`${symbol} Information`}</h1>
      <div>
        {tokenData &&  Object.keys(tokenData).map(key => {
            return <h1>{tokenData[key]}</h1>
        })}
      </div>
    
      <div> <ScriptTag type="text/javascript" src = {`https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=${symbol}&tsyms=USD,EUR,CNY,GBP`}/></div>
    </div>
  );
}

