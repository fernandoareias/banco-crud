import React from 'react';

interface ButtonProps {
  content: string;
  myClassName?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ content, myClassName = "", onClick }) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  };

  return (
    <button
      type={onClick ? 'button' : 'submit'}
      className={"bg-[#2DDFA6] hover:bg-[#40C99D] text-black font-bold py-2 px-4 rounded " + myClassName}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
