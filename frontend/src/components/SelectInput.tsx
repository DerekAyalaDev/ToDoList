import React from "react";
import { selectInputProps } from "../types/selectInputProps.types";

/**
 * Reusable select dropdown input component.
 * Displays a label and a select element with options passed as props.
 *
 * @param {selectInputProps} props - The props for the SelectInput component.
 * @param {string} props.id - The ID for the input field.
 * @param {string} props.label - The label to display above the select input.
 * @param {Option[]} props.options - The options to display in the dropdown.
 * @param {string} props.value - The current selected value.
 * @param {function} props.onChange - The function to call when the selected option changes.
 */
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

