import { CustomForm } from "./CustomForm";
import { priorityOptions, stateOptions } from "../utils/options";
import { useSearchContext } from "./SearchContext";

/**
 * Component that renders a search form for filtering ToDo items.
 * Updates the global search state when the form is submitted.
 */
export const SearchForm = () => {
  const { setSearchState } = useSearchContext();

  /**
   * Handles the form submission to update the search state.
   *
   * @param {object} values - The search form values: name, priority, and state.
   */
  const handleSearchSubmit = (values: {
    name: string;
    priority: string;
    state: string;
  }) => {
    setSearchState((prevState) => ({
      ...prevState,
      text: values.name,
      priority: values.priority,
      state: values.state,
    }));
  };

  return (
    <div className="container-item padding-vertical-20 container-border border-dotted">
      <CustomForm
        btnLabel="Search"
        priorityOptions={priorityOptions}
        stateOptions={stateOptions}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
};
