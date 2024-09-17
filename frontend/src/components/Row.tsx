import { ToDo } from '../types/toDoTableProps.type';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { EditModal } from './EditModal';
import { getDueDateColor } from '../utils/getDueDateColor';

export const TodoRow = ({ todo }: { todo: ToDo }) => (
  <div className="table-row">
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
    <div className="table-field field-name">{todo.text}</div>
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
        <DeleteIcon className="background-red" style={{ color: 'white', width: '100%', height: '90%' }} />
      </button>
    </div>
  </div>
);

export const EmptyRow = ({ keyIndex }: { keyIndex: number }) => (
  <div className="table-row">
    <div className="table-field">-</div>
    <div className="table-field field-name">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
    <div className="table-field">-</div>
  </div>
);
