import React from 'react';

const Input = ({
  placeholder = '',
  value,
  type = 'text',
  onChange
}) => {
  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
    />
  );
};

export default Input;
