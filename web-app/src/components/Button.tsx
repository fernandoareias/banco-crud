import React from 'react'



interface ButtonProps {
  content: string;  
  myClassName?: string;
}


const Button: React.FC<ButtonProps> = ({ content, myClassName = ""}) => {
  return (
    <button type='submit' className={"bg-[#2DDFA6] hover:bg-[#40C99D] text-black font-bold py-2 px-4 rounded " + myClassName } >
      {content}
    </button>
  )
}

export default Button