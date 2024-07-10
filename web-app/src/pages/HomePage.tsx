import React, { useContext, useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { gql, useLazyQuery } from '@apollo/client';
import { Account, Transaction } from '../models/Account';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';
import { toast } from 'react-toastify';
import { contaMask } from '../utils/contaMask';

const HomePage = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [errorShown, setErrorShown] = useState(false); 
  const [accountId, setAccountId] = useState("");

  const GET_ACCOUNT_DETAILS = gql`
    query GetAccountDetails($accountId: ID!) {
      accountBalance(accountId: $accountId)
      transactions {
        id
        type
        amount
        fromAccount {
          id
          accountNumber
        }
        toAccount {
          id
          accountNumber
        }
        date
      }
    }
  `;

  const [getAccountDetails, { loading, error, data }] = useLazyQuery(GET_ACCOUNT_DETAILS);

  const navigate = useNavigate();

    
  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setErrorShown(true); 
  };

 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!accountId)
    {
      showErrorToast("Não foi informada uma conta valida.");
      return;
    }

    getAccountDetails({ variables: { accountId } });

    if (error && !errorShown) {
      console.log("Error " + error.message);
      showErrorToast("Não foi possível encontrar a conta informada.");
    }
  };

  useEffect(() => {
    if (data) {
      const transactions: Transaction[] = data.transactions.map((transactionData: any) => {
        return new Transaction(
          transactionData.id,
          transactionData.type,
          transactionData.amount,
          transactionData.fromAccount ? new Account(
            transactionData.fromAccount.accountNumber,
            transactionData.fromAccount.balance,
            []
          ) : null,
          transactionData.toAccount ? new Account(
            transactionData.toAccount.accountNumber,
            transactionData.toAccount.balance,
            []
          ) : null,
          new Date(transactionData.date)
        );
      });

      setAccount(new Account(accountId, data.accountBalance, transactions));
      sessionStorage.setItem("account", JSON.stringify(account));
      navigate("/extratos");
    }

    const timeout = setTimeout(() => {
      setErrorShown(false);
    }, 5000);

    return () => clearTimeout(timeout); 
  }, [data, accountId, error, errorShown, loading, navigate, setAccount]);


  const handleAccount = (e: any) => {
    const input = e.target.value;

    const numericInput = input.replace(/\D/g, '');

    if (numericInput.length <= 6) {
        setAccountId(numericInput); 
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 w-2/5 h-96">

        <div className="relative">
          <div className="faculdade-curso relative pl-6">
            <h2 className='font-poppins text-3xl font-bold'>Acesse sua conta</h2>
          </div>
          <div className="absolute left-0 top-0 h-full w-4 bg-[#2DDFA6]"></div>
        </div>

          <form action='' className='w-86 mt-10' onSubmit={handleSubmit}>
            <Input
              label="Número da conta"
              value={contaMask(accountId) || ""}
              inputPlaceholder='000000-1'
              onInputChange={handleAccount}
              isRequired={false} 
            />

            <div className='mt-10'>
              <Button content='Acessar' />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
