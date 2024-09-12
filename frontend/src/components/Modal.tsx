import { ModalProps } from "../types/modalProps.types";

export const Modal: React.FC<ModalProps> = ({children, isOpen, onClose}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="container-item padding-vertical-20 container-border border-dotted">
          <div className="row-button">
            <h2>Create To Do</h2>
            <button className="form-btn background-red" onClick={onClose}>Close</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}