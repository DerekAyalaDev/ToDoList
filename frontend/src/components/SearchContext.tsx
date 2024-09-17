import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/**
 * Interface representing the structure of the search state (SearchDTO).
 * This defines the criteria used for filtering and sorting ToDo items.
 */
interface SearchDTO {
  text: string;              // The search text or name of the ToDo item.
  priority: string;          // The priority level of the ToDo (e.g., High, Medium, Low).
  state: string;             // The state of the ToDo item ("done" or "undone").
  sortByPriority: "" | "asc" | "desc";  // Sort order for priority (ascending, descending, or none).
  sortByDueDate: "" | "asc" | "desc";   // Sort order for due date (ascending, descending, or none).
  pageNumber: number;        // The current page number for pagination.
}

/**
 * Initial search state used when no values are provided.
 * This state is used as a default when the app is first loaded or reset.
 */
const initialSearchState: SearchDTO = {
  text: "",                  // No search text by default.
  priority: "",              // No priority filter by default.
  state: "",                 // No state filter by default (all tasks).
  sortByPriority: "",        // No sorting by priority by default.
  sortByDueDate: "",         // No sorting by due date by default.
  pageNumber: 0,             // Start from the first page.
};


/**
 * Context to hold and manage global search state.
 * This allows multiple components to access and update search criteria.
 */
const SearchContext = createContext<{
  searchState: SearchDTO;
  setSearchState: React.Dispatch<React.SetStateAction<SearchDTO>>;
}>({
  searchState: initialSearchState,
  setSearchState: () => {},
});

interface SearchProviderProps {
  children: ReactNode;
}

/**
 * SearchProvider component to wrap the parts of the application where
 * the global search state is needed. It also persists the state in localStorage.
 *
 * @param {ReactNode} children - The child components that will have access to the search state.
 */
export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchState, setSearchState] = useState<SearchDTO>(() => {
    const savedState = localStorage.getItem("searchState");
    return savedState ? JSON.parse(savedState) : initialSearchState;
  });

  // Save the search state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchState", JSON.stringify(searchState));
  }, [searchState]);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Custom hook to access the search context easily from any component.
 */
export const useSearchContext = () => {
  return useContext(SearchContext);
};

