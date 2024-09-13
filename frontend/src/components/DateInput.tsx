import { DateInputProps } from "../types/dateInputProps.types";

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
