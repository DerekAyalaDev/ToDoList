export interface ToDo {
  id: number;
  name: string;
  priority: string;
  dueDate: string | null;
}

export interface TodoTableProps {
  todos: ToDo[];
}