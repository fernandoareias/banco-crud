import React from 'react';

interface MoneyInputProps {
  label: string;
  inputPlaceholder: string;
  onInputChange: (value: string) => void;
  value: string;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  label,
  inputPlaceholder,
  onInputChange,
  value,
  labelClassName = "",
  inputClassName = "",
  isRequired = false,
}) => {

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');

    const formattedValue = (+cleanValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formattedValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
  
    const cleanedValue = rawValue.replace(/[^\d.,]/g, '');
    onInputChange(cleanedValue);
  };

  return (
    <div className="text-left mt-5">
      <label htmlFor="money" className={`mb-2 text-sm font-medium ${labelClassName}`} style={{ color: '#505D63' }}>
        {label + (isRequired ? " *" : "")}
      </label>
      <input
        type="text"
        name="money"
        id="money"
        value={formatCurrency(value)}
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
        className={`bg-[#E6EDEB] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${inputClassName}`}
        required={isRequired}
      />
    </div>
  );
};

export default MoneyInput;
