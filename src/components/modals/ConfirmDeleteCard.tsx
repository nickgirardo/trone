import Modal from "react-modal";

import "./modal.scss";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
}

export const ConfirmDeleteCardModal = ({
  isOpen,
  closeModal,
  handleConfirm,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Edit Card"
    className="modal modal-sm edit-card-modal"
  >
    <h2>Are you sure you want to delete this card?</h2>
    <div className="modal-body">
      <div>This action cannot be undone!</div>
      <div className="controls">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleConfirm}>Yes, delete it</button>
      </div>
    </div>
  </Modal>
);
