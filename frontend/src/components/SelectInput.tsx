import React from "react";
import { selectInputProps } from "../types/selectInputProps.types";

export const SelectInput: React.FC<selectInputProps> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="form-select-group container-field">
      <label className="text" htmlFor={id}>
        {label}
      </label>
      <select className="form-select" id={id} value={value} onChange={onChange}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
