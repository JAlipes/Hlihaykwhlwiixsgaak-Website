import React from "react";

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'name' | 'id'> {
  id: string;
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

export default function InputField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = 'text',
  wrapperClassName,
  inputClassName,
  ...rest
}: InputFieldProps) {
  const baseInput = "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500";
  const className = [baseInput, inputClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        className={className}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
