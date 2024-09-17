// Props for a DateInput component that allows a user to input a date value
export type DateInputProps = {
  /**
   * Unique ID for the date input element
   */
  id: string;

  /**
   * Label text for the date input field
   */
  label: string;

  /**
   * The current value of the date input field, in a string format
   */
  value: string;

  /**
   * Handler for when the value of the date input changes
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
