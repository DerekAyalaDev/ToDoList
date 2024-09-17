import { Option } from "./selectInputProps.types"
import { ToDo } from "./toDoTableProps.type"
import { searchFormType } from "./searchForm.types"
export type CustomFormProps = {
  btnLabel: string,
  priorityOptions: Option[],
  stateOptions?: Option[],
  includeDate?: boolean,
  initialValues?: ToDo,
  searchFormValues?: searchFormType,
  onSearchSubmit?: (values: { name: string; priority: string; state: string }) => void,
  onToDoSubmit?: (values: { name: string; priority: string; dueDate: string }) => void;
}