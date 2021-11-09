import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import { SnackbarProvider } from 'notistack';
import { GlobalContext } from './context/globalContext';

// axios
import axios from 'axios';

// Components
import Navbar from './components/routes/Navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import Profile from './components/routes/Profile/Profile';
import LoginSignup from './components/routes/LoginSignup/LoginSignup';
import TokenInformation from './components/routes/TokenInformation/TokenInformation';
import TopCoins from './components/routes/TopCoins/TopCoins';
import Portfolio from './components/routes/Portfolio/Portfolio';

function App() {
  const { loggedIn, setLoggedIn, setUsername } = useContext(GlobalContext);

  useEffect(() => {
    // authorizeTokenFromStorage();
    singleUpdatePrices();
  }, []);

  const singleUpdatePrices = async () => {
    await axios.get('/prices/startup-request-prices');
  };

  // const authorizeTokenFromStorage = async (token) => {
  //   // If user is logged in, check if their stored token is still valid
  //   // This will be valid for 2 weeks by django default.
  //   try {
  //     const response = await axios.get('/prices/current_user/', {
  //       headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
  //     });
  //     setLoggedIn(true); //???
  //     setUsername(response.data.user.username); // previously this.setState({ username: json.username });
  //   } catch (error) {
  //     setLoggedIn(false);
  //   }
  // };

  const storeLoginCredentials = (token) => {
    token && localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          loggedIn={loggedIn}
          // display_form={display_form}
          handleLogout={handleLogout}
        />
        <SnackbarProvider maxSnack={4}>
          <main>
            <Routes>
              <Route path="/" element={<LookupWallet />} />
              <Route path="/profile" element={<Profile />} />
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
        </SnackbarProvider>
      </div>
    </Router>
  );
}

export default App;
