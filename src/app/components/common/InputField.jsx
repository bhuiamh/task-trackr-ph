import React from 'react';

const InputField = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  className,
  required
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-transparent w-full px-3.5 py-2 border-b-2 focus:outline-none border-white focus:border-b-2 focus:border-primary text-white ${className}`}
      required={required}
    />
  );
};

export default InputField;
