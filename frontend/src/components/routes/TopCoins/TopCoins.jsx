import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopCoins() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
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
                    Currency: {item.name} | Current Price: ${item.current_price}{" "}
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
}
