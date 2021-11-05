import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';

// Components
import Navbar from './components/navbar/Navbar';

// Routes
import SearchWalletBalance from './components/routes/SearchWalletBalance/SearchWalletBalance';
import Login from './components/routes/Login/Login';
import Profile from './components/routes/Profile/Profile';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<SearchWalletBalance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
