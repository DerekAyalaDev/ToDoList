// Props used for the SortableButton component
export type sortableButtonProps = {
  /**
   * The label displayed on the button, e.g., "Priority" or "Due Date"
   */
  label: string;

  /**
   * The current sort state, which can be "" (no sort), "asc" (ascending), or "desc" (descending)
   */
  sortState: "" | "asc" | "desc";

  /**
   * Callback function triggered when the sort state changes, passes the new sort order
   */
  onSortChange: (sortOrder: "" | "asc" | "desc") => void;
};