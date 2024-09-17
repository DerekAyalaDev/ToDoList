import { useSearchContext } from "./SearchContext";
import { TodoRow, EmptyRow } from "./Row";
import { SortableButton } from "./SortableButton";
import { useEffect, useState } from "react";
import { ToDo } from "../types/toDoTableProps.type";
import { Pagination } from "./Pagination";

export const TodoTable = () => {
  const { searchState, setSearchState } = useSearchContext();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      text: searchState.text || "",
      priority: searchState.priority || "",
      state: searchState.state || "",
      sortByPriority: searchState.sortByPriority || "",
      sortByDueDate: searchState.sortByDueDate || "",
      pageNumber: searchState.pageNumber.toString(),
    });

    fetch(`http://localhost:9090/api/todos?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching ToDos");
        }
        return response.json();
      })
      .then((data: { todos: ToDo[]; totalPages: number }) => {
        setTodos(data.todos);
        setTotalPages(data.totalPages);
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
      {error && <div className="error-message">Error: {error}</div>}
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

        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}

        {Array.from({ length: emptyRowsCount }).map((_, index) => (
          <EmptyRow key={index} keyIndex={index} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};
