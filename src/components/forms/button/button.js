import React from 'react';

const Button = ({
  value = 'Button',
  type = 'submit'
}) => {
  return (
    <input
      value={value}
      type={type}
    />
  );
};

export default Button;
