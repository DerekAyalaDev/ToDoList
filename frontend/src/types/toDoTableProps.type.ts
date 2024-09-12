export type ToDo = {
  id: number,
  name: string,
  priority: string,
  dueDate: string | null,
}

export type TodoTableProps = {
  todos: ToDo[],
}