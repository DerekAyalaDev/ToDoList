import { useEffect, useState } from "react";
import { sortableButtonProps } from "../types/sortableButtonProps.types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/**
 * SortableButton Component
 * Renders a button with sorting functionality. Clicking the button toggles the sort order (asc, desc, or none).
 * 
 * @param {string} label - The label displayed on the button.
 * @param {"" | "asc" | "desc"} sortState - The current sort state (ascending, descending, or none).
 * @param {(sortOrder: "" | "asc" | "desc") => void} onSortChange - Callback to trigger when the sort state changes.
 */
export const SortableButton = ({
  label,
  sortState: initialSortState,
  onSortChange,
}: sortableButtonProps) => {
  const [sortState, setSortState] = useState<"" | "asc" | "desc">(
    initialSortState
  );

  // Update the local sort state whenever the prop value changes
  useEffect(() => {
    setSortState(initialSortState);
  }, [initialSortState]);

  // Handle the button click and toggle through sorting states: "", "asc", "desc"
  const handleSortClick = () => {
    let newSortState: "" | "asc" | "desc";
    if (sortState === "") {
      newSortState = "asc";
    } else if (sortState === "asc") {
      newSortState = "desc";
    } else {
      newSortState = "";
    }

    // Update local state and notify parent component of the change
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
