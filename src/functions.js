
export const handleFormEventValue = event => event.target.value;

export const getType = val => val === null ? 'Null' :
  val === undefined ? 'Undefined' :
    Object.prototype.toString.call(val).slice(8, -1);
