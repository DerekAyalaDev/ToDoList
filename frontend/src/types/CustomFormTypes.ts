import { Option } from "./SearchSelectTypes"

export type CustomFormProps = {
  btnLabel: string,
  btnOnClick?: () => void,
  priorityOptions: Option[],
  stateOptions: Option[]
}