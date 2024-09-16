import { TodoTableProps } from "../types/toDoTableProps.type";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDueDateColor } from "../utils/getDueDateColor";
import { Button } from "@mui/material";
import { EditModal } from "./EditModal";
import { SortableButton } from "./SortableButton";

export const TodoTable = ({ todos }: TodoTableProps) => {
  const handleSortChange = (field: string, sortOrder: string) => {
    console.log(`Ordenando por ${field}: ${sortOrder}`);
    // Aquí puedes manejar la lógica de ordenamiento dependiendo del campo y el orden (asc, desc, o none)
  };

  const totalItems = 10;
  const emptyRowsCount = totalItems - todos.length;

  return (
    <div className="container-item container-border border-dotted padding-vertical-20">
      <div className="table">
        <div className="table-row">
          <div className="table-field table-header padding-vertical-5">
            Done
          </div>
          <div className="table-field table-header padding-vertical-5">
            Name
          </div>
          <SortableButton
            label="Priority"
            onSortChange={(sortOrder) =>
              handleSortChange("priority", sortOrder)
            }
          />
          <SortableButton
            label="Due Date"
            onSortChange={(sortOrder) => handleSortChange("dueDate", sortOrder)}
          />
          <div className="table-field table-header padding-vertical-5">
            Actions
          </div>
        </div>
        {todos.map((todo) => (
          <div className="table-row" key={todo.id}>
            <div className="table-field">
              {todo.done ? (
                <Button>
                  <CheckBoxIcon style={{ color: "green" }} />
                </Button>
              ) : (
                <Button>
                  <CheckBoxOutlineBlankIcon />
                </Button>
              )}
            </div>
            <div className="table-field field-name">{todo.name}</div>
            <div className="table-field">{todo.priority}</div>
            <div
              className="table-field"
              style={{ backgroundColor: getDueDateColor(todo.dueDate) }}
            >
              {todo.dueDate ? todo.dueDate : "-"}
            </div>
            <div className="table-field table-actions">
              <EditModal todo={todo} />
              <button className="table-button">
                <DeleteIcon
                  className="background-red"
                  style={{ color: "white", width: "100%", height: "90%" }}
                />
              </button>
            </div>
          </div>
        ))}

        {/* Filas vacías */}
        {Array.from({ length: emptyRowsCount }).map((_, index) => (
          <div className="table-row" key={`empty-${index}`}>
            <div className="table-field">-</div>
            <div className="table-field field-name">-</div>
            <div className="table-field">-</div>
            <div className="table-field">-</div>
            <div className="table-field">-</div>
          </div>
        ))}
      </div>
    </div>
  );
};
