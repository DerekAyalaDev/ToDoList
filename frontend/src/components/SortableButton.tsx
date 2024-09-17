import { useEffect, useState } from "react";
import { sortableButtonProps } from "../types/sortableButtonProps.types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const SortableButton = ({
  label,
  sortState: initialSortState,
  onSortChange,
}: sortableButtonProps) => {
  const [sortState, setSortState] = useState<"" | "asc" | "desc">(
    initialSortState
  );

  useEffect(() => {
    setSortState(initialSortState);
  }, [initialSortState]);

  const handleSortClick = () => {
    let newSortState: "" | "asc" | "desc";
    if (sortState === "") {
      newSortState = "asc";
    } else if (sortState === "asc") {
      newSortState = "desc";
    } else {
      newSortState = "";
    }

    setSortState(newSortState);
    onSortChange(newSortState);
  };

  return (
    <button
      onClick={handleSortClick}
      className="table-field table-header padding-vertical-5 sort-button"
    >
      {label}
      {sortState === "asc" && <ArrowUpwardIcon style={{ fontSize: "16px" }} />}
      {sortState === "desc" && (
        <ArrowDownwardIcon style={{ fontSize: "16px" }} />
      )}
    </button>
  );
};
