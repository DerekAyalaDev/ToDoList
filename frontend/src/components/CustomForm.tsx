import { SelectInput } from "./SelectInput";
import { CustomFormProps } from "../types/customFormProps.types";
import { DateInput } from "./DateInput";
import { useEffect, useState } from "react";

/**
 * CustomForm is a reusable form component used for creating, editing, or searching ToDo items.
 * It handles form submissions and dynamically includes or excludes the Due Date field based on the `includeDate` flag.
 * The form can handle both search and create/edit submissions depending on the props passed.
 */
export const CustomForm = ({
  btnLabel,
  priorityOptions,
  stateOptions,
  includeDate,
  initialValues,
  onSearchSubmit,
  searchFormValues,
  onToDoSubmit,
}: CustomFormProps) => {
  // Form state variables
  const [name, setName] = useState(initialValues?.text || searchFormValues?.name || "");
  const [priority, setPriority] = useState(initialValues?.priority || searchFormValues?.priority || priorityOptions[0].value);
  const [state, setState] = useState(searchFormValues?.state || "");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || "");

  // Update form fields if initialValues or searchFormValues change
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.text || "");
      setPriority(initialValues.priority || priorityOptions[0].value);
      setDueDate(initialValues.dueDate || "");
    } else if (searchFormValues) {
      setName(searchFormValues.name || "");
      setPriority(searchFormValues.priority || priorityOptions[0].value);
      setState(searchFormValues.state || "");
    }
  }, [initialValues, searchFormValues]);

  /**
   * Handles form submission.
   * Determines if the form is used for searching or creating/updating based on the props passed.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearchSubmit) {
      // If the form is used for searching tasks
      onSearchSubmit({
        name,
        priority,
        state,
      });
    } else if (onToDoSubmit) {
      // If the form is used for creating or updating tasks
      onToDoSubmit({
        name,
        priority,
        dueDate,
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="container-field">
        <label htmlFor="name">Name</label>
        <input
          className="form-input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <SelectInput
        id="priority"
        label="Priority"
        options={priorityOptions}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <div className="row-button">
        {includeDate ? (
          <DateInput
            id="dueDate"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        ) : (
          <SelectInput
            id="state"
            label="State"
            options={stateOptions}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        )}
        <button className="form-btn background-green" type="submit">
          {btnLabel}
        </button>
      </div>
    </form>
  );
};
