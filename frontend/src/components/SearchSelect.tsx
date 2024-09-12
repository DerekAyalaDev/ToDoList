import { SearchSelectProps } from "../types/searchSelectProps.types"

export const SearchSelect = (props: SearchSelectProps) => {
  return (
    <div className="form-select-group container-field">
      <label className="text" htmlFor={props.id}>{props.label}</label>
      <select className="form-select" id={props.id}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}