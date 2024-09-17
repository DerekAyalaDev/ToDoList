export type ModalProps = {
  label: string,
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode;
}