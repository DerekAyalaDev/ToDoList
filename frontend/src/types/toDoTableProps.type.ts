export type ToDo = {
  id: number,
  done: boolean
  name: string,
  priority: string,
  dueDate: string | null,
}

export type TodoTableProps = {
  todos: ToDo[],
}