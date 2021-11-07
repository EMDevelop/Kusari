import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';

// Components
import Navbar from './components/routes/navbar/Navbar';

// Routes
import LookupWallet from './components/routes/LookupWallet/LookupWallet';
import Login from './components/routes/Login/Login';
import Profile from './components/routes/Profile/Profile';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LookupWallet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
