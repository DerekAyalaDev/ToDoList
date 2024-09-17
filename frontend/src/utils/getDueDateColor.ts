import daysjs from "dayjs";

/**
 * Function to determine the background color based on the due date and completion status.
 *
 * @param {string | null} dueDate - The due date of the task in string format (can be null if not set).
 * @param {boolean} done - The status indicating if the task is completed.
 * @returns {string} The appropriate color code for the due date status:
 *                   - Green (#a6ffb3) if the task is done or has more than 14 days remaining.
 *                   - Red (#ff6d6d) if the due date is within 7 days.
 *                   - Yellow (#ffd879) if the due date is within 8-14 days.
 *                   - Empty string if no due date is set.
 */
export const getDueDateColor = (dueDate: string | null, done: boolean) => {
  if (done) return "#a6ffb3";
  if (!dueDate) return "";
  const today = daysjs();
  const dueDateObj = daysjs(dueDate);
  const daysRemaining = dueDateObj.diff(today, "day");

  if (daysRemaining <= 7) {
    return "#ff6d6d";
  } else if (daysRemaining <= 14) {
    return "#ffd879";
  } else {
    return "#a6ffb3";
  }
};
