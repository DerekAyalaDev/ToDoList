import { ToDo } from "../types/toDoTableProps.type";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { EditModal } from "./EditModal";
import { getDueDateColor } from "../utils/getDueDateColor";

export const TodoRow = ({ todo }: { todo: ToDo }) => {
  const toggleDoneStatus = () => {
    fetch(`http://localhost:9090/api/todos/${todo.id}/status`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating ToDo status");
        }
        return response.text();
      })
      .then((data) => {
        console.log("ToDo status updated:", data);
        window.location.reload(); // Recargar la página para actualizar la tabla y las métricas
      })
      .catch((error) => {
        console.error("Error updating ToDo status:", error);
      });
  };

  const deleteToDo = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ToDo?"
    );
    if (confirmed) {
      fetch(`http://localhost:9090/api/todos/${todo.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error deleting ToDo");
          }
          return response.text();
        })
        .then((data) => {
          console.log("ToDo deleted successfully:", data);
          window.location.reload(); // Recargar la página para actualizar la tabla
        })
        .catch((error) => {
          console.error("Error deleting ToDo:", error);
        });
    }
  };

  return (
    <div className="table-row">
      <div className="table-field">
        {/* Botón para cambiar el estado 'done' */}
        {todo.done ? (
          <Button onClick={toggleDoneStatus}>
            <CheckBoxIcon style={{ color: "green" }} />
          </Button>
        ) : (
          <Button onClick={toggleDoneStatus}>
            <CheckBoxOutlineBlankIcon />
          </Button>
        )}
      </div>
      <div className="table-field field-name">{todo.text}</div>
      <div className="table-field">{todo.priority}</div>
      <div
        className="table-field"
        style={{ backgroundColor: getDueDateColor(todo.dueDate, todo.done) }}
      >
        {todo.dueDate ? todo.dueDate : "-"}
      </div>
      <div className="table-field table-actions">
        <EditModal todo={todo} />
        <button className="table-button" onClick={deleteToDo}>
          <DeleteIcon
            className="background-red"
            style={{ color: "white", width: "100%", height: "90%" }}
          />
        </button>
      </div>
    </div>
  );
};

export const EmptyRow = ({ keyIndex }: { keyIndex: number }) => (
  <div className="table-row">
    <div className="table-field">-</div>
    <div className="table-field field-name">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
  </div>
);
