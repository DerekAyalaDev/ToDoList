export type sortableButtonProps = {
  label: string,
  sortState: '' | 'asc' | 'desc',
  onSortChange: (sortOrder: '' | 'asc' | 'desc') => void,
}