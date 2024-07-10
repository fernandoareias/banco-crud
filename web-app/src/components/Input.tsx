
import React from 'react'

interface InputProps {
    label: string; 
    inputPlaceholder: string;
    onInputChange: (date: any) => void;
    value: string;
    labelClassName?: string;
    inputClassName?: string;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    type?: string;
  }
  
const Input: React.FC<InputProps> = ({
  label, 
  inputPlaceholder, 
  onInputChange, 
  value, 
  labelClassName = "", 
  inputClassName = "",
  isRequired = false,
  minLength = 0,  
  maxLength = 100,
  type = "text"
}) => 
{
  return (
    <div className='text-left mt-5 '>
        <label htmlFor="text" className={"mb-2 text-sm font-medium " + labelClassName} style={{ color: '#505D63' }}>{label + (isRequired ? " *" : "")}</label>
        <input 
          type={type} 
          name="text" 
          id="text" 
          value={value} 
          onChange={(e) => onInputChange(e)} 
          placeholder={inputPlaceholder} 
          className={"bg-[#E6EDEB] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " + inputClassName} 
          required={isRequired}
          min={minLength}
          max={maxLength}
        />
    </div>
  )
}

export default Input