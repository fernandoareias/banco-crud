import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';
import { Account } from '../models/Account';

interface AccountRouteProps {
  element: JSX.Element;
}

const AccountRoute: React.FC<AccountRouteProps> = ({ element }) => {
  const { account } = useContext(AccountContext);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAccount = sessionStorage.getItem('account');
    if (storedAccount && !account) {
      try {
        const parsedAccount: Account = JSON.parse(storedAccount);
        setAuthenticated(true);
      } catch (error) {
        console.error('Erro ao desserializar conta da sessionStorage:', error);
      }
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) return null; 

  if (!authenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return <Route element={element} />;
};

export default AccountRoute;
