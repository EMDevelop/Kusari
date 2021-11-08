import React from 'react';

class TopCoinsPage extends component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false, 
    }
  }

  componentDidMount() {

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h')
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json,
          })
        });
  }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    else {}

      return (
        <div className="top-coins-page">
            <ul>
              {items.map(item => {
                  <li key={item.id}>
                      Coin: {item.coin} | Price: {item.price}
                  </li>    
              })};
            </ul>  
        </div>
      );
    }
}



export default function TopCoins() {
  return (
    <div className="top-coins-page">
      <h1>Top Coins</h1>
      <div> middle section</div>
      <div> Bottom section</div>
    </div>
  );
}
