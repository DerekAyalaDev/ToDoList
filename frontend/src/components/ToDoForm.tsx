import { CustomForm } from "./CustomForm"

export const ToDoForm = () => {
  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const stateOptions = [
    { value: "true", label: "Done" },
    { value: "false", label: "Undone" },
  ];
  return (
    <CustomForm btnLabel="Create" priorityOptions={priorityOptions} stateOptions={stateOptions} />
  )
}