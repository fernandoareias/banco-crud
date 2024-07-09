import React from 'react'
import { Transaction } from '../models/Account';

interface ExtratoProps {
  transaction: Transaction;  
}


const ExtratoItem : React.FC<ExtratoProps> = ({  transaction }) => {
  return (
    <div className='grid grid-cols-4 p-5'>
      <h3>Origem: {transaction.fromAccount?.accountNumber}</h3>
      <span>Beneficario: {transaction.toAccount?.accountNumber}</span>
      <span>Tipo:{transaction.type}</span>
      <span>Valor: {transaction.amount}</span>
    </div>
  )
}

export default ExtratoItem