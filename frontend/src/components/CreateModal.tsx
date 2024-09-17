import { useState } from "react";
import { Modal } from "./Modal";
import { priorityOptions } from "../utils/options";
import { CustomForm } from "./CustomForm";

/**
 * Component to handle the creation of new ToDo items through a modal form.
 * It manages the modal's visibility and submission logic for creating a ToDo.
 */
export const CreateModal = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  // Opens the modal and resets any previous errors
  const openCreateModal = () => {
    setCreateModalOpen(true);
    setErrors(null);
  };

  // Closes the modal
  const closeCreateModal = () => setCreateModalOpen(false);

  /**
   * Handles the submission of the create ToDo form.
   * Sends the form data to the backend via a POST request.
   *
   * @param {object} values - The values from the CustomForm component.
   * @param {string} values.name - The name of the ToDo task.
   * @param {string} values.priority - The priority of the ToDo task.
   * @param {string} values.dueDate - The due date of the ToDo task.
   */
  const handleCreateSubmit = (values: { name: string; priority: string; dueDate: string }) => {
    const toDoDTO = {
      text: values.name,
      priority: values.priority,
      dueDate: values.dueDate || null, // Send null if no dueDate is provided
    };

    fetch("http://localhost:9090/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDoDTO),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setErrors(errorData);
            throw new Error("Validation failed");
          });
        }
        return response.text();
      })
      .then((data) => {
        console.log("ToDo created successfully:", data);
        closeCreateModal();
        window.location.reload(); // Reload page to reflect new ToDo
      })
      .catch((error) => {
        console.error("Error creating ToDo:", error);
      });
  };

  return (
    <div className="container-item">
      <div>
        <button onClick={openCreateModal} className="form-btn background-green">
          Create
        </button>
      </div>
      <Modal label="Create" isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        <CustomForm
          btnLabel="Create"
          priorityOptions={priorityOptions.slice(1)} // Slice to skip "All" option
          includeDate
          onToDoSubmit={handleCreateSubmit}
        />
        {errors && (
          <div className="error-messages">
            {Object.entries(errors).map(([field, errorMessage]) => (
              <p key={field} className="error-message">
                {errorMessage}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
