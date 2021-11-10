import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalContextProvider } from './context/globalContext';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
