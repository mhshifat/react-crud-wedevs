import React from "react";
import "./index.css";

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const Input: React.FC<Props> = ({
  placeholder,
  label,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        className="input-text"
        type="text"
        value={value}
        id={label}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={() => onBlur?.()}
      />
    </div>
  );
};

export default Input;
