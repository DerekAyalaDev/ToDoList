import { ToDo } from "../types/toDoTableProps.type";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { EditModal } from "./EditModal";
import { getDueDateColor } from "../utils/getDueDateColor";

/**
 * Represents a row in the ToDo table. It displays the task details and provides functionality
 * to mark the task as done/undone and to delete the task.
 * 
 * @param {ToDo} todo - The ToDo item to be displayed in the row.
 */
export const TodoRow = ({ todo }: { todo: ToDo }) => {
  /**
   * Toggles the done status of a ToDo item by sending a PUT request to the backend.
   * Reloads the page after the update to reflect the changes in the table and metrics.
   */
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating ToDo status:", error);
      });
  };

  /**
   * Deletes a ToDo item by sending a DELETE request to the backend.
   * Asks for confirmation before proceeding with the deletion.
   * Reloads the page after deletion to update the table.
   */
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
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting ToDo:", error);
        });
    }
  };

  return (
    <div className="table-row">
      <div className="table-field">
        {/* Toggle done/undone status of the task */}
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

/**
 * Represents an empty row in the ToDo table.
 * Used to maintain the table structure when there are fewer than 10 ToDo items.
 *
 * @param {number} keyIndex - The index for the key prop to uniquely identify each empty row.
 */
export const EmptyRow = ({ keyIndex }: { keyIndex: number }) => (
  <div className="table-row">
    <div className="table-field">-</div>
    <div className="table-field field-name">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
  </div>
);

