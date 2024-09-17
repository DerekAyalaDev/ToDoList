import React, { useState } from "react";
import { Modal } from "./Modal";
import { priorityOptions } from "../utils/options";
import { CustomForm } from "./CustomForm";

export const CreateModal = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  // Abrir y cerrar modal
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  // Función para manejar la creación de ToDo
  const handleCreateSubmit = (values: {
    name: string;
    priority: string;
    dueDate: string;
  }) => {
    const toDoDTO = {
      text: values.name,
      priority: values.priority,
      dueDate: values.dueDate || null, // Si no hay dueDate, se envía como null
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
        window.location.reload();
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
      <Modal
        label="Create"
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      >
        <CustomForm
          btnLabel="Create"
          priorityOptions={priorityOptions.slice(1)}
          includeDate
          onToDoSubmit={handleCreateSubmit}
        />
        {errors && (
          <div className="error-messages">
            {Object.entries(errors).map(([field, errorMessage]) => (
              <p key={field} className="error-message">
                {`${errorMessage}`}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
