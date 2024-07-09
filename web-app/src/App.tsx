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

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // URL do seu servidor GraphQL
    cache: new InMemoryCache(),
  });

  
  const [account, setAccount] = useState<Account>(new Account());

  return (
    <>
    <ApolloProvider client={client}>
      <AccountContext.Provider value={{ account, setAccount }}> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/extratos" element={<ExtratoPage />} />
          </Routes>
        </BrowserRouter>
      </AccountContext.Provider>
     </ApolloProvider>
    </>
  );
}

export default App;
