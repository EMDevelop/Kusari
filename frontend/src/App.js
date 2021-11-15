import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';

import { GlobalContext } from './context/globalContext';

// axios
import axios from 'axios';

// Components
import Navbar from './components/routes/navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';

import TokenInformation from './components/routes/TokenInformation/TokenInformation';
import TopCoins from './components/routes/TopCoins/TopCoins';
import Portfolio from './components/routes/Portfolio/Portfolio';
import MyWallets from './components/routes/MyWallets/MyWallets';

function App() {
  const { loggedIn, setLoggedIn, setLoggedInUserName } =
    useContext(GlobalContext);

  useEffect(() => {
    authorizeTokenFromStorage();
    singleUpdatePrices();
  }, []);

  const singleUpdatePrices = async () => {
    await axios.get('/prices/startup-request-prices');
  };

  const authorizeTokenFromStorage = async (token) => {
    // If user is logged in, check if their stored token is still valid
    // This will be valid for 2 weeks by django default.
    try {
      const response = await axios.get('/prices/current_user/', {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
      });
      console.log(response);
      setLoggedIn(true); //???
      setLoggedInUserName(response.data.user.username);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const storeLoginCredentials = (token) => {
    token && localStorage.setItem('token', token);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          loggedIn={loggedIn}
          setUsername={setLoggedInUserName}
          setLogged={setLoggedIn}
        />
        <main>
          <Routes>
            <Route path="/" element={<LookupWallet />} />
            <Route path="/profile" element={<MyWallets />} />
            <Route path="/token/:symbol" element={<TokenInformation />} />
            <Route path="/top-coins" element={<TopCoins />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
