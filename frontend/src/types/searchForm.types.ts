// Structure used in the search form to represent the form's input data
export type searchFormType = {
  /**
   * The name or text to search for
   */
  name: string;

  /**
   * The priority level selected in the form, e.g., "High", "Medium", "Low"
   */
  priority: string;

  /**
   * The task's state, which could be "done", "undone", or "all"
   */
  state: string;
};
