import { ModalProps } from "../types/modalProps.types";

/**
 * A reusable modal component.
 * It opens when the `isOpen` prop is true and closes when the user clicks outside of the modal content
 * or the 'Close' button is clicked.
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @param {string} props.label - The label or title for the modal.
 * @param {boolean} props.isOpen - A boolean indicating if the modal is open or closed.
 * @param {function} props.onClose - The function to close the modal.
 * @param {React.ReactNode} props.children - The content of the modal.
 */
export const Modal = ({ label, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  // Close modal if the overlay is clicked
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="container-item padding-vertical-20 container-border border-dotted">
          <div className="row-button">
            <h2>{label} To Do</h2>
            <button className="form-btn background-red" onClick={onClose}>
              Close
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
