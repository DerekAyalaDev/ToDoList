import { Option } from "./selectInputProps.types";
import { ToDo } from "./toDoTableProps.type";
import { searchFormType } from "./searchForm.types";

// Props for the CustomForm component, used for both creating/searching ToDos
export type CustomFormProps = {
  /**
   * Label text for the form's submit button
   * Example: "Create", "Search", or "Edit"
   */
  btnLabel: string;

  /**
   * Array of priority options for the priority dropdown,
   * each option contains a value and a label
   */
  priorityOptions: Option[];

  /**
   * Optional array of state options for the state dropdown,
   * used when including a status like "Done" or "Undone"
   */
  stateOptions?: Option[];

  /**
   * Whether or not to include the date input in the form
   * Set this to true if the form is for creating or editing a ToDo
   */
  includeDate?: boolean;

  /**
   * Initial values for the form fields when editing a ToDo
   * Used to pre-populate fields in the form
   */
  initialValues?: ToDo;

  /**
   * Values used in the search form for filtering ToDos,
   * This is used when the form is for searching tasks
   */
  searchFormValues?: searchFormType;

  /**
   * Function to handle the form submission for searching tasks,
   * called when the form is used for filtering/searching ToDos
   */
  onSearchSubmit?: (values: {
    name: string;
    priority: string;
    state: string;
  }) => void;

  /**
   * Function to handle form submission for creating or editing tasks,
   * called when the form is used for adding or updating a ToDo
   */
  onToDoSubmit?: (values: {
    name: string;
    priority: string;
    dueDate: string;
  }) => void;
};
