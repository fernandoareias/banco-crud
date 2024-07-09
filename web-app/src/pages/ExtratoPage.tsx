import React, { useContext, useEffect, useState } from 'react'
import Button from '../components/Button'
import ExtratoItem from '../components/ExtratoItem'
import { AccountContext } from '../contexts/AccountContext';
import { Transaction } from '@apollo/client';
import CreateTransaction from '../components/CreateTransaction';

const ExtratoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { account, setAccount } = useContext(AccountContext);
 
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  
  return (
    <main>
        <CreateTransaction show={showModal} onClose={closeModal}>b</CreateTransaction>
  <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-8 w-2/5 h-2/3">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className='font-poppins text-3xl font-bold'>Saldo</h2>
          <span>R$: {account.balance}</span>
        </div>
        <div>
          <Button content='Transferir' onClick={openModal}/>
        </div>
      </div>

      <div className='mt-20'>
        <table className='min-w-full table-fixed'>
          <thead className="bg-gray-100">
            <tr>
              <th className='px-4 py-2'>Origem</th>
              <th className='px-4 py-2'>Beneficiário</th>
              <th className='px-4 py-2'>Tipo</th>
              <th className='px-4 py-2'>Valor</th>
            </tr>
          </thead>
        </table>
        <div style={{ height: '300px', overflowY: 'auto' }}>
          <table className='min-w-full table-fixed'>
            <tbody>
              {account.transactions.map((e: any) => (
                <tr key={e.id}>
                  <td className='border px-4 py-2'>{e.fromAccount?.accountNumber}</td>
                  <td className='border px-4 py-2'>{e.toAccount?.accountNumber}</td>
                  <td className='border px-4 py-2'>{e.type}</td>
                  <td className='border px-4 py-2'>{e.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</main>

  
  )
}

export default ExtratoPage