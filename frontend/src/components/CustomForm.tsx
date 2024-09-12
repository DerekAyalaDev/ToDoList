import { SearchSelect } from "./SearchSelect";
import { CustomFormProps } from "../types/customFormProps.types";

export const CustomForm: React.FC<CustomFormProps> = ({btnLabel, priorityOptions, stateOptions}) => {
  return (
    <form className="form">
      <div className="container-field">
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" />
      </div>
      <SearchSelect id="priority" label="Priority" options={priorityOptions} />
      <div className="row-button">
        <SearchSelect id="state" label="State" options={stateOptions} />
        <button className="form-btn background-green" type="submit">
          {btnLabel}
        </button>
      </div>
    </form>
  )
}