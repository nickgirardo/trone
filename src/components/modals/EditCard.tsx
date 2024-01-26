import { ChangeEvent, useState, MouseEventHandler } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { DelCardWarning } from "./Settings/Preferences";
import { deleteCard } from "../../reducers/Cards";
import { ConfirmDeleteCardModal } from "./ConfirmDeleteCard";

import "./modal.scss";
import "./edit-card.scss";

interface Props {
  id: string;
  name: string;
  notes: string;
  isOpen: boolean;
  closeModal: () => void;
  handleUpdateCard: (name: string, notes: string) => void;
}

export const EditCardModal = ({
  id,
  name,
  notes,
  isOpen,
  closeModal,
  handleUpdateCard,
}: Props) => {
  const dispatch = useAppDispatch();
  const delCardWarning = useAppSelector(
    (state) => state.preferences.delCardWarning
  );

  const [newName, setName] = useState<string>(name);
  const [newNotes, setNotes] = useState<string>(notes);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);

  const startDeleteProcess: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (delCardWarning === DelCardWarning.Never) {
      dispatch(deleteCard(id));
    } else {
      setShowConfirmDeleteModal(true);
    }

    ev.preventDefault();
    return false;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Card"
      className="modal modal-md edit-card-modal"
    >
      <h2>Edit Card</h2>
      <form>
        <div className="modal-body">
          <div className="card-name">
            <input
              placeholder="Card name"
              value={newName}
              onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                setName(ev.target.value)
              }
            />
          </div>
          <div className="card-notes">
            <div className="notes">
              <textarea
                placeholder="Notes for this card"
                value={newNotes}
                onChange={(ev: ChangeEvent<HTMLTextAreaElement>) =>
                  setNotes(ev.target.value)
                }
              />
            </div>
          </div>
          <div className="controls">
            <button onClick={() => closeModal()}>Cancel</button>
            <input
              type="submit"
              value="Update"
              onClick={() => handleUpdateCard(newName, newNotes)}
              disabled={!newName.length}
            />
          </div>
          <div className="delete-card">
            <h3>Delete Card</h3>
            <button onClick={startDeleteProcess}>Delete</button>
          </div>
        </div>
      </form>
      <ConfirmDeleteCardModal
        isOpen={showConfirmDeleteModal}
        handleConfirm={() => dispatch(deleteCard(id))}
        closeModal={() => setShowConfirmDeleteModal(false)}
      />
    </Modal>
  );
};
