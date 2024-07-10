import React, { useState } from 'react'
import Input from './Input';
import { contaMask } from '../utils/contaMask';
import Button from './Button';
import MoneyInput from './MoneyInput';

interface CreateTransactionProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
 

const CreateTransaction: React.FC<CreateTransactionProps> = ({ show, onClose, children }) => {
    const [toAccountId, setToAccountId] = useState("");
    const [amount, setAmount] = useState<string>('');

    if (!show) {
      return null;
    }
    

    const handleAmountChange = (value: string) => {
      setAmount(value); 
    };
    
    const handleToAccountId = (e: any) => {
      const input = e.target.value;
  
      const numericInput = input.replace(/\D/g, '');
  
      if (numericInput.length <= 6) {
        setToAccountId(numericInput); 
      }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-full  max-w-3xl mx-auto my-6">
          <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold text-dark">
                Realizar transferência
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            
            <form action='' className="relative p-6 flex-auto text-white flex gap-4">
              <div className='grid grid-cols-3 gap-4'>
                <Input
                  label="Número da conta favorecida"
                  value={contaMask(toAccountId) || ""}
                  inputPlaceholder='000000-1'
                  onInputChange={handleToAccountId}
                  isRequired={true} 
                />
                <MoneyInput
                  label="Valor a transferir"
                  inputPlaceholder="Digite o valor"
                  value={amount}
                  onInputChange={handleAmountChange}
                  isRequired={true}
                />
                
                <div className='mt-11'>
                  <Button content='Transferir' />
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateTransaction;