import { ChangeEvent, useState } from "react";
import Modal from "react-modal";

import "./CardNotes.scss";

interface Props {
  name: string;
  notes: string;
  isOpen: boolean;
  closeModal: () => void;
  handleUpdateCard: (name: string, notes: string) => void;
}

export const CardNotesModal = ({
  name,
  notes,
  isOpen,
  closeModal,
  handleUpdateCard,
}: Props) => {
  const [newName, setName] = useState<string>(name);
  const [newNotes, setNotes] = useState<string>(notes);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Edit Card">
      {/* TODO putting the classname here instead of on modal for reasons */}
      <form className="edit-card">
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
            <div className="controls">
              <input
                type="submit"
                value="Update"
                onClick={() => handleUpdateCard(newName, newNotes)}
                disabled={!newName.length}
              />
              <button onClick={() => closeModal()}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
