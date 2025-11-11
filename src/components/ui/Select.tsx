import React from 'react';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
  name,
  required = false,
}) => {
  return (
    <div className={`custom-select ${className}`}>
      {label && (
        <label className="custom-select__label">
          {label}
          {required && <span className="custom-select__required">*</span>}
        </label>
      )}
      <select
        className={`custom-select__select ${error ? 'custom-select__select--error' : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="custom-select__error">{error}</span>}
    </div>
  );
};

export default Select;

