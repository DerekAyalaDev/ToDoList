import { SearchSelect } from "./SearchSelect";
import { CustomFormProps } from "../types/customFormProps.types";

export const CustomForm = (props: CustomFormProps) => {
  return (
    <form className="form">
      <div className="container-field">
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" />
      </div>
      <SearchSelect id="priority" label="Priority" options={props.priorityOptions} />
      <div className="row-button">
        <SearchSelect id="state" label="State" options={props.stateOptions} />
        <button className="form-btn background-green" type="submit">
          {props.btnLabel}
        </button>
      </div>
    </form>
  )
}