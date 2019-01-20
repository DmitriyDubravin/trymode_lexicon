import React from 'react';

const Textarea = ({
  placeholder = '',
  value,
  onChange
}) => {

  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    ></textarea>
  );
};

export default Textarea;
