import React from 'react';

const Select = ({
  placeholder = 'Select',
  list,
  chosen,
  onChange
}) => {
  const handleChange = e => {
    const { value } = e.target;
    onChange(value !== placeholder ? value : '');
  };

  return (
    <select defaultValue={chosen} onChange={handleChange}>
      <option>{placeholder}</option>
      {list.map((item, i) => <option key={i}>{item}</option>)}
    </select>
  );
};

export default Select;
