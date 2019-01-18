import React from 'react';

const Select = ({
  placeholder,
  list,
  chosen,
  set
}) => (
  <select defaultValue={chosen} onChange={set}>
    <option>{placeholder}</option>
    {list.map((item, i) => <option key={i}>{item}</option>)}
  </select>
);

export default Select;
