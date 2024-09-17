// Represents an option in a dropdown select, with a value and label
export type Option = {
  /**
   * The actual value of the option, which will be used
   */
  value: string;

  /**
   * The text label displayed to the user for this option
   */
  label: string;
};

// Props for a SelectInput component
export type selectInputProps = {
  /**
   * The unique ID for the input element, used to link the label and input
   */
  id: string;

  /**
   * The label text for the select input
   */
  label: string;

  /**
   * Array of available options for the select dropdown
   */
  options: Option[] | undefined;

  /**
   * The currently selected value in the select input
   */
  value: string | undefined;

  /**
   * Handler for when the value of the select input changes
   */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
