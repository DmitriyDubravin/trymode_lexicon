import React from 'react';

const Button = ({
  value = 'Button',
  type = 'submit',
  className,
  onClick
}) => {
  return (
    <input
      value={value}
      type={type}
      className={className}
      onClick={onClick}
    />
  );
};

export default Button;
