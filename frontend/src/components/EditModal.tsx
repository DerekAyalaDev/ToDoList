import { useState } from "react";
import { Modal } from "./Modal";
import { priorityOptions } from "../utils/options";
import { CustomForm } from "./CustomForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { EditModalProps } from "../types/EditModalProps.types";

/**
 * A modal component that handles the editing of an existing ToDo item.
 * It opens a form pre-filled with the ToDo data and sends an update request to the backend on submit.
 *
 * @param {EditModalProps} props - The props for the EditModal component.
 * @param {ToDo} props.todo - The ToDo item to be edited.
 */
export const EditModal = ({ todo }: EditModalProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  // Opens the edit modal and resets any previous errors
  const openEditModal = () => {
    setEditModalOpen(true);
    setErrors(null);
  };

  // Closes the edit modal
  const closeEditModal = () => setEditModalOpen(false);

  /**
   * Handles the submission of the edit form.
   * Sends the updated ToDo data to the backend via a PUT request.
   *
   * @param {object} values - The updated values from the CustomForm component.
   * @param {string} values.name - The name of the ToDo task.
   * @param {string} values.priority - The priority of the ToDo task.
   * @param {string} values.dueDate - The due date of the ToDo task.
   */
  const handleEditSubmit = (values: { name: string; priority: string; dueDate: string }) => {
    const toDoDTO = {
      text: values.name,
      priority: values.priority,
      dueDate: values.dueDate || null,
    };

    fetch(`http://localhost:9090/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDoDTO),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setErrors(errorData); // Stores the errors in the state
            throw new Error("Validation failed");
          });
        }
        return response.text();
      })
      .then((data) => {
        console.log("ToDo updated successfully:", data);
        closeEditModal(); // Closes the modal after updating
        window.location.reload(); // Reloads the page to refresh the ToDo list
      })
      .catch((error) => {
        console.error("Error updating ToDo:", error);
      });
  };

  return (
    <div>
      <div>
        <button className="table-button" onClick={openEditModal}>
          <BorderColorIcon
            className="background-green"
            style={{ color: "white", width: "100%", height: "90%" }}
          />
        </button>
      </div>
      <Modal label="Edit" isOpen={isEditModalOpen} onClose={closeEditModal}>
        <CustomForm
          btnLabel="Edit"
          priorityOptions={priorityOptions.slice(1)}
          includeDate
          initialValues={todo}
          onToDoSubmit={handleEditSubmit}
        />
        {/* Displays validation errors under the form */}
        {errors && (
          <div className="error-messages">
            {Object.entries(errors).map(([field, errorMessage]) => (
              <p key={field} className="error-message">
                {`${field}: ${errorMessage}`}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

