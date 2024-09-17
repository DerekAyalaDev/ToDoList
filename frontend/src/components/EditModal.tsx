import { useState } from "react";
import { Modal } from "./Modal";
import { priorityOptions } from "../utils/options";
import { CustomForm } from "./CustomForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { EditModalProps } from "../types/EditModalProps.types";

export const EditModal = ({ todo }: EditModalProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  const openEditModal = () => {
    setEditModalOpen(true);
    setErrors(null);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const handleEditSubmit = (values: {
    name: string;
    priority: string;
    dueDate: string;
  }) => {
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
            setErrors(errorData); // Almacena los errores en el estado
            throw new Error("Validation failed");
          });
        }
        return response.text();
      })
      .then((data) => {
        console.log("ToDo updated successfully:", data);
        closeEditModal(); // Cerrar el modal después de actualizar
        window.location.reload(); // Recargar la página para actualizar la lista
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
        {/* Mostrar errores debajo del formulario */}
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
