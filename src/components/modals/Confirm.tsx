import Modal from "react-modal";

import "./modal.scss";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
  label: string;
  moreInfo?: string;
  noUndo?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  closeModal,
  handleConfirm,
  label,
  moreInfo,
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
      {moreInfo && <div>{moreInfo}</div>}
      {noUndo && <div>This action cannot be undone!</div>}
      <div className="controls">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  </Modal>
);
