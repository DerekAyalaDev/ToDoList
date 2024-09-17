import { DateInputProps } from "../types/dateInputProps.types";

/**
 * A reusable date input component.
 * It takes an id, label, value, and onChange handler to manage date inputs.
 *
 * @param {DateInputProps} props - The props for the DateInput component.
 * @param {string} props.id - The ID of the input field.
 * @param {string} props.label - The label for the date input field.
 * @param {string} props.value - The current value of the date input.
 * @param {function} props.onChange - The function to handle changes in the input field.
 */
export const DateInput = ({ id, label, value, onChange }: DateInputProps) => {
  return (
    <div className="form-select-group container-field">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-input"
        type="date"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


