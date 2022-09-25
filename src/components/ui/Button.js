import React from 'react';

const Button = ({ onClick, className, children }) => {
  return (
    <button
      className={`${className} font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
