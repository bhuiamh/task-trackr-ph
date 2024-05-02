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
      className={`bg-transparent w-full px-2 py-o md:py-1 md:px-2 lg:px-3 border-b-2 placeholder:text-xs lg:placeholder:text-sm focus:outline-none border-white focus:border-b-2 focus:border-primary text-white ${className}`}
      required={required}
    />
  );
};

export default InputField;
