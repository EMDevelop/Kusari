import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../dataTable/DataTable';
import TokenInformation from '../../../tokenInformation/TokenInformation';
import axios from 'axios';

export default function TopCoins() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);

  const navigate = useNavigate();
  const [isUSDperUnit, setIsUSDperUnit] = useState([])
  
  function SearchWalletBalance() {
  // const [address, setAddress] = useState(undefined);
  // const [walletDetails, setWalletDetails] = useState([]);
  const [walletType, setwalletType] = useState(undefined);
  const [fetchingAddressInfo, setFetchingAddressInfo] = useState(false);

  const { address, setAddress, walletDetails, setWalletDetails } =
    useContext(GlobalContext);

  // Every time someone types in the input, the `address` state is updated
  const handleInputChange = (e) => {
    setAddress(e);
  };

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        setItems(response.data);
        setIsLoaded(true);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoaded ? (
    <div className="top-coins-page">
      <h1>Top Coins</h1>
      <div> middle section</div>
      <div>
        <div className="top-coins-page">
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id}>
                  {/* <img src={item.image} alt="" /> */}
                  <h4>
                    Currency: {item.name} | Current Price: ${item.current_price}{' '}
                    | Market Cap: ${item.market_cap}
                  </h4>
                </li>
              );
            })}
            ;
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );

//Ranking Top 100 Coins
useEffect(() => {
    filterRowData('USDperUnit');
  }, [props.rowData]);


render (); {
  const {USDperUnit} = this.state
  const sorted = usDperUnit.sort( (a, b) => {
    const isReversed = (sortType === 'desc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name)
  })
}

//Click into individual coin performance data
<Link
  to={(
    pathname: '../../../tokenInformation/TokenInformation',
    state: { datarow, token, name, USDperUnit }
  )}
>

render() {
  const { state } = this.props.const location
  return {

  }
    },
  })
}