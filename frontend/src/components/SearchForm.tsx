import { CustomForm } from "./CustomForm";
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
    <div className="container-item padding-vertical-20 container-border border-dotted">
      <CustomForm btnLabel="Search" priorityOptions={priorityOptions} stateOptions={stateOptions} />
    </div>
  );
};
