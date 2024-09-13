export type Option = {
  value: string,
  label: string
}

export type SearchSelectProps = {
  id: string,
  label: string,
  options: Option[] | undefined,
  value: string | undefined,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}