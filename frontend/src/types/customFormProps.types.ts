import { Option } from "./searchSelectProps.types"
import { ToDo } from "./toDoTableProps.type"
export type CustomFormProps = {
  btnLabel: string,
  btnOnClick?: () => void,
  priorityOptions: Option[],
  stateOptions?: Option[],
  includeDate?: boolean,
  initialValues?: ToDo,
}