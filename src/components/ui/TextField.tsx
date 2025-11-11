import React from 'react';
import './TextField.css';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  className = '',
  name,
  required = false,
}) => {
  return (
    <div className={`custom-textfield ${className}`}>
      {label && (
        <label className="custom-textfield__label">
          {label}
          {required && <span className="custom-textfield__required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`custom-textfield__input ${error ? 'custom-textfield__input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
      />
      {error && <span className="custom-textfield__error">{error}</span>}
    </div>
  );
};

export default TextField;

