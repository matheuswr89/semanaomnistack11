import React from 'react';
import Header from './components/Header';
import './global.css';
import { ToastProvider } from 'react-toast-notifications';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastProvider>
        <Header />
        <Routes />
      </ToastProvider>
    </>
  );
}

export default App;
