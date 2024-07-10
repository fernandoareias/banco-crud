import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/Input';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExtratoPage from './pages/ExtratoPage';
import { AccountContext } from './contexts/AccountContext';
import { Account } from './models/Account';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AccountRoute from './guards/AccountGuard';

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_NODE_API_URI ?? 'http://localhost:4000/graphql', 
    cache: new InMemoryCache(),
  });

  
  const [account, setAccount] = useState<Account>(new Account());

  return (
    <>
     <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
     <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
    <ApolloProvider client={client}>
      <AccountContext.Provider value={{ account, setAccount }}> 
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/extratos" element={<AccountRoute element={<ExtratoPage />} />} />
        </Routes>
      </BrowserRouter>
      </AccountContext.Provider>
     </ApolloProvider>
    </>
  );
}

export default App;
