import { ToDo } from "./toDoTableProps.type";

// Props for an EditModal component, which handles editing an existing ToDo item
export type EditModalProps = {
  /**
   * The ToDo item that is being edited
   */
  todo: ToDo;
};
