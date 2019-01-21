import React from 'react';

const Button = ({
  value = 'Button',
  type = 'submit',
  onChange
}) => {
  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default Button;
