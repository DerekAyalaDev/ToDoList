import { useSearchContext } from "./SearchContext";
import { TodoRow, EmptyRow } from "./Row";
import { SortableButton } from "./SortableButton";
import { useEffect, useState } from "react";
import { ToDo } from "../types/toDoTableProps.type";
import { Pagination } from "./Pagination";

/**
 * TodoTable Component
 * Displays a table of ToDo items, allows sorting, and integrates pagination.
 * Fetches data from the server based on the current search state and displays the results in a table.
 */
export const TodoTable = () => {
  const { searchState, setSearchState } = useSearchContext();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [totalPages, setTotalPages] = useState(1); // State to manage total pages for pagination
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch ToDos when the search state changes (e.g., sorting, filters)
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
        // Update the list of ToDos and the total number of pages
        setTodos(data.todos);
        setTotalPages(data.totalPages);
        console.log("ToDos fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching ToDos:", error);
        setError(error.message); // Store the error message for display
      });
  }, [searchState]); // Dependency array ensures the effect runs when search state changes

  // Handle sort changes for priority and due date
  const handleSortChange = (field: string, sortOrder: "" | "asc" | "desc") => {
    setSearchState((prevState) => ({
      ...prevState,
      [field]: sortOrder,
    }));
  };

  const totalItems = 10; // Total number of rows to display
  const emptyRowsCount = totalItems - todos.length; // Number of empty rows needed to fill the table

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

        {/* Render each ToDo item in a table row */}
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}

        {/* Render empty rows if needed */}
        {Array.from({ length: emptyRowsCount }).map((_, index) => (
          <EmptyRow key={index} keyIndex={index} />
        ))}
      </div>

      {/* Pagination component to navigate between pages */}
      <Pagination totalPages={totalPages} />
    </div>
  );
};
