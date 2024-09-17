// Represents a task item in the to-do list
export type ToDo = {
  /**
   * Unique identifier for the to-do item
   */
  id: number;

  /**
   * Marks if the task is completed or not
   */
  done: boolean;

  /**
   * The actual content or description of the task
   */
  text: string;

  /**
   * The priority level of the task, can be "Low", "Medium", or "High"
   */
  priority: string;

  /**
   * The due date for the task, can be null if no due date is set
   */
  dueDate: string | null;
};

