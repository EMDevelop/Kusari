import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/App.scss';

import { GlobalContext } from './context/globalContext';
import { useSnackbar } from 'notistack';

// axios
import axios from 'axios';

// Components
import Navbar from './components/routes/Navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import LoginSignup from './components/routes/LoginSignup/LoginSignup';
import TokenInformation from './components/routes/TokenInformation/TokenInformation';
import TopCoins from './components/routes/TopCoins/TopCoins';
import Portfolio from './components/routes/Portfolio/Portfolio';
import MyWallets from './components/routes/MyWallets/MyWallets';

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };
  const fail = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  const info = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
    });
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setLoggedInUserName('');
    success('Logged out successfully.');
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          loggedIn={loggedIn}
          // display_form={display_form}
          handleLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<LookupWallet />} />
            <Route path="/profile" element={<MyWallets />} />
            <Route
              path="/login-signup"
              element={
                <LoginSignup storeDetailsInApp={storeLoginCredentials} />
              }
            />
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
