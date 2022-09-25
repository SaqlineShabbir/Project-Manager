import React from 'react';

const Input = ({ htmlFor, placeholder, onChange, value }) => {
  return (
    <>
      <label htmlFor={htmlFor} className="mb-2">
        {placeholder}
      </label>
      <input
        type="text"
        id={htmlFor}
        className={`border border-gray-700 p-2 rounded mb-5`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
