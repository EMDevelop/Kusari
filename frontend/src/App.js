import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';

// axios
import axios from 'axios';

// Components
import Navbar from './components/routes/navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import Login from './components/routes/Login/Login';
import Signup from './components/routes/Signup/Signup';
import Profile from './components/routes/Profile/Profile';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [username, setUsername] = useState(undefined);

  // If user is logged in, check if their stored token is still valid
  // This will be valid for 2 weeks by django default.
  useEffect(() => {
    authorizeTokenFromStorage();
  }, []);

  const authorizeTokenFromStorage = async (token) => {
    try {
      const response = await axios.get('/prices/current_user/', {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
      });
      setLoggedIn(true); //???
      setUsername(response.data.user.username); // previously this.setState({ username: json.username });
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const handleLogin = async (e, data) => {
    console.log(data);
    e.preventDefault();
    // axios post request to url with body as data
    try {
      const response = await axios.post(
        '/token-auth/',
        data // JSON.stringify(data)
      );
      storeLoginCredentials(response.data.user.username, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const storeLoginCredentials = (username, token) => {
    setLoggedIn(true);
    setUsername(username);
    token && localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <Navbar
        loggedIn={loggedIn}
        // display_form={display_form}
        handleLogout={handleLogout}
      />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LookupWallet />} />
            <Route
              path="/login"
              element={
                <Login
                  handleLogin={handleLogin}
                  storeDetailsInApp={storeLoginCredentials}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/signup"
              element={<Signup storeDetailsInApp={storeLoginCredentials} />}
            />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
