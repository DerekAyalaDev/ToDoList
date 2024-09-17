import { useSearchContext } from "./SearchContext";
import { TodoRow, EmptyRow } from "./Row";
import { SortableButton } from "./SortableButton";
import { useEffect, useState } from "react";
import { ToDo } from "../types/toDoTableProps.type";

export const TodoTable = () => {
  const { searchState, setSearchState } = useSearchContext();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:9090/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchState),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching ToDos");
        }
        return response.json();
      })
      .then((data: ToDo[]) => {
        setTodos(data);
        console.log("ToDos fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching ToDos:", error);
        setError(error.message);
      });
  }, [searchState]);

  const handleSortChange = (field: string, sortOrder: "" | "asc" | "desc") => {
    setSearchState((prevState) => ({
      ...prevState,
      [field]: sortOrder,
    }));
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
            sortState={searchState.sortByPriority}
            onSortChange={(sortOrder) =>
              handleSortChange("sortByPriority", sortOrder)
            }
          />
          <SortableButton
            label="Due Date"
            sortState={searchState.sortByDueDate}
            onSortChange={(sortOrder) =>
              handleSortChange("sortByDueDate", sortOrder)
            }
          />
          <div className="table-field table-header padding-vertical-5">
            Actions
          </div>
        </div>

        {/* Renderiza las filas de todos */}
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}

        {/* Renderiza las filas vacías */}
        {Array.from({ length: emptyRowsCount }).map((_, index) => (
          <EmptyRow key={index} keyIndex={index} />
        ))}
      </div>
    </div>
  );
};
