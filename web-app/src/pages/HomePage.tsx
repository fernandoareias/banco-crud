import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Account, Transaction } from '../models/Account';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';

const HomePage = () => {
  const { account, setAccount } = useContext(AccountContext);
  const navigate = useNavigate();
  const [accountId, setAccountId ] = useState("");
  const GET_ACCOUNT_DETAILS = gql`
    query GetAccountDetails {
      accountBalance(accountId: "000001")
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

  
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNT_DETAILS, {
    variables: { accountId },
  });

   // Mapeando as transações
  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch(); 

    if(error) throw new Error("");

    if(!data) return;

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
    
    console.log("Conta " + JSON.stringify(account));
    console.log('Data:', JSON.stringify(data));
    console.log('Erro:', error);
    console.log('Loadin:', loading);
  }; 

  const handleAccount = (e: any) => {
    setAccountId(e.target.value);
    console.log(accountId);
  }
 

  return (
    <main>
      <div className="flex justify-center items-center h-screen" >
        <div className="bg-white p-8 w-2/5 h-96"> 
          <h2 className='font-poppins text-3xl font-bold'>Acesse sua conta</h2>

          <form action='' className='w-86 mt-10' onSubmit={handleSubmit}>
            <Input 
                label="Número da conta" 
                value={accountId || ""} 
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
  )
}

export default HomePage