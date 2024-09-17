import { CustomForm } from "./CustomForm";
import { priorityOptions, stateOptions } from "../utils/options";

export const SearchForm = () => {
  return (
    <div className="container-item padding-vertical-20 container-border border-dotted">
      <CustomForm btnLabel="Search" priorityOptions={priorityOptions} stateOptions={stateOptions} />
    </div>
  );
};
