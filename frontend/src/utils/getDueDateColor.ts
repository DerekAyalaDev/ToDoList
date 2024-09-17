import daysjs from "dayjs";

export const getDueDateColor = (dueDate: string | null) => {
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
