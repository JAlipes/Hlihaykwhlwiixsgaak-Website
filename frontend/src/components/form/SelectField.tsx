import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'name' | 'id'> {
  id: string;
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  wrapperClassName?: string;
  selectClassName?: string;
}

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  required,
  wrapperClassName,
  selectClassName,
  ...rest
}: SelectFieldProps) {
  const baseSelect = "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500";
  const className = [baseSelect, selectClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        className={className}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value || opt.label} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
