import { CustomForm } from "./CustomForm";
import { priorityOptions, stateOptions } from "../utils/options";
import { useSearchContext } from "./SearchContext";

export const SearchForm = () => {
  const { setSearchState } = useSearchContext();

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
