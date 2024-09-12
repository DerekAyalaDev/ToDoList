import { SearchSelect } from "./SearchSelect";
import { CustomFormProps } from "../types/customFormProps.types";
import { DateInput } from "./DateInput";

export const CustomForm = ({btnLabel, priorityOptions, stateOptions, includeDate}: CustomFormProps) => {
  return (
    <form className="form">
      <div className="container-field">
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" />
      </div>
      <SearchSelect id="priority" label="Priority" options={priorityOptions} />
      {includeDate && <DateInput id="dueDate" label="Due Date" />}
      <div className="row-button">
        <SearchSelect id="state" label="State" options={stateOptions} />
        <button className="form-btn background-green" type="submit">
          {btnLabel}
        </button>
      </div>
    </form>
  )
}
