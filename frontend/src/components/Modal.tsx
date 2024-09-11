import { ModalProps } from "../types/ModalTypes";

export const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="container-item container-border border-dotted">
          <div className="row-button">
            <h2>Create To Do</h2>
            <button className="form-btn background-red" onClick={props.onClose}>Close</button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}