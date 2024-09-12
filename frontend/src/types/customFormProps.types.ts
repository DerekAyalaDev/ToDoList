import { Option } from "./searchSelectProps.types"

export type CustomFormProps = {
  btnLabel: string,
  btnOnClick?: () => void,
  priorityOptions: Option[],
  stateOptions: Option[]
}