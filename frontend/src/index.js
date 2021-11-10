import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalContextProvider } from './context/globalContext';
import { CookiesProvider } from 'react-cookie';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <GlobalContextProvider>
        <SnackbarProvider maxSnack={4}>
          <App />
        </SnackbarProvider>
      </GlobalContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
