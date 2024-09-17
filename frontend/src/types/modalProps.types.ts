// Props for a Modal component that wraps any child content inside a modal dialog
export type ModalProps = {
  /**
   * Label or title displayed at the top of the modal
   */
  label: string;

  /**
   * Boolean flag to control whether the modal is open or closed
   */
  isOpen: boolean;

  /**
   * Function to close the modal, typically triggered by a button click or external action
   */
  onClose: () => void;

  /**
   * The child components or content that will be displayed inside the modal
   */
  children: React.ReactNode;
};
