import { CustomForm } from "./CustomForm";
import { priorityOptions, stateOptions } from "../utils/options";
import { useSearchContext } from "./SearchContext";

export const SearchForm = () => {
  const { setSearchState, searchState } = useSearchContext();

  const handleSearchSubmit = (values: {
    name: string;
    priority: string;
    state: string;
  }) => {
    // Actualizar el estado global con los nuevos valores de búsqueda
    setSearchState((prevState) => ({
      ...prevState,
      text: values.name,
      priority: values.priority,
      state: values.state, // Actualizamos el estado basado en los valores "true", "false" o ""
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
