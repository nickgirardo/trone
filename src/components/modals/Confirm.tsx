import Modal from "react-modal";

import "./modal.scss";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
  allowConfirm?: boolean;
  label: string;
  children?: ReactNode;
  noUndo?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  closeModal,
  allowConfirm = true,
  handleConfirm,
  label,
  children,
  noUndo,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Edit Card"
    className="modal modal-sm edit-card-modal"
  >
    <h2>{label}</h2>
    <div className="modal-body">
      {children}
      {noUndo && <div>This action cannot be undone!</div>}
      <div className="controls">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleConfirm} disabled={!allowConfirm}>
          Confirm
        </button>
      </div>
    </div>
  </Modal>
);
