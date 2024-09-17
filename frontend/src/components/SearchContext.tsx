import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SearchDTO {
  text: string;
  priority: string;
  state: string;
  sortByPriority: "" | "asc" | "desc";
  sortByDueDate: "" | "asc" | "desc";
  pageNumber: number;
}

const initialSearchState: SearchDTO = {
  text: "",
  priority: "",
  state: "",
  sortByPriority: "",
  sortByDueDate: "",
  pageNumber: 0,
};

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

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchState, setSearchState] = useState<SearchDTO>(() => {
    const savedState = localStorage.getItem("searchState");
    return savedState ? JSON.parse(savedState) : initialSearchState;
  });

  useEffect(() => {
    localStorage.setItem("searchState", JSON.stringify(searchState));
  }, [searchState]);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
