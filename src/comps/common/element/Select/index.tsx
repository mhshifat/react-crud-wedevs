import React, { useEffect, useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import "./index.css";

interface Props {
  label?: string;
  placeholder?: string;
  multiSelect?: boolean;
  options?: { index: number; value: string; onClick?: () => void }[];
  values?: { index: number; value: string }[];
  onSelect?: (values: { index: number; value: string }[]) => void;
}

const Select: React.FC<Props> = ({
  options,
  label,
  multiSelect,
  placeholder,
  values,
  onSelect,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    { index: number; value: string }[]
  >([]);

  useEffect(() => {
    if (values) setSelectedOptions(values);
    else setSelectedOptions([]);
  }, [values]);

  return (
    <div className="select-group">
      {label && (
        <label className="select-label" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="select-container">
        {!selectedOptions.length ? (
          <input
            disabled
            type="text"
            className="select-input"
            placeholder={placeholder}
          />
        ) : (
          <div className="select-selected">
            {multiSelect
              ? selectedOptions.map((item) => (
                  <span className="select-selected__item" key={item.index}>
                    {item.value}{" "}
                    <FaTimes
                      onClick={() => {
                        setSelectedOptions(
                          selectedOptions.filter((i) => i.index !== item.index)
                        );
                        onSelect?.([
                          ...selectedOptions.filter(
                            (i) => i.index !== item.index
                          ),
                        ]);
                      }}
                    />
                  </span>
                ))
              : selectedOptions[0].value}
          </div>
        )}
        <div onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
          <FaChevronDown
            className={`select-icon ${isOptionsOpen ? "open" : ""}`}
          />
        </div>
        <ul className={`select-options ${isOptionsOpen ? "open" : ""}`}>
          {!options?.length ? (
            <p>No options provided</p>
          ) : (
            options.map((opt) => (
              <li
                key={opt.index}
                onClick={() => {
                  if (multiSelect) {
                    setSelectedOptions([...selectedOptions, opt]);
                    setIsOptionsOpen(false);
                  } else {
                    setSelectedOptions([opt]);
                    setIsOptionsOpen(false);
                  }
                  opt?.onClick?.();
                  onSelect?.([...selectedOptions, opt]);
                }}
              >
                {opt.value}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Select;
