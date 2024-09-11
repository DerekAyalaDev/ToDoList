import { SearchSelect } from "./SearchSelect";

export const SearchForm = () => {
  const priorityOptions = [
    { value: "", label: "All" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const stateOptions = [
    { value: "", label: "All" },
    { value: "true", label: "Done" },
    { value: "false", label: "Undone" },
  ];
  return (
    <div className="container-item container-border border-dotted">
      <div className="container-field">
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" />
      </div>
      <SearchSelect id="priority" label="Priority" options={priorityOptions} />
      <div className="row-button">
        <SearchSelect id="state" label="State" options={stateOptions} />
        <button className="form-btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
