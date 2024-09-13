import React from "react";
import { SearchSelectProps } from "../types/searchSelectProps.types";

export const SearchSelect: React.FC<SearchSelectProps> = ({
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
