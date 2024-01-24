import { ChangeEvent, useState } from "react";
import Modal from "react-modal";

import "./CardNotes.scss";

interface Props {
  notes: string;
  isOpen: boolean;
  closeModal: () => void;
  handleUpdateNotes: (notes: string) => void;
}

export const CardNotesModal = ({
  notes,
  isOpen,
  closeModal,
  handleUpdateNotes,
}: Props) => {
  const [newNotes, setNotes] = useState<string>(notes);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Edit Card">
      <div className="card-notes">
        <div className="notes">
          <form>
            <textarea
              value={newNotes}
              onChange={(ev: ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(ev.target.value)
              }
            />
            <div className="controls">
              <input
                type="submit"
                value="Update"
                onClick={() => handleUpdateNotes(newNotes)}
                disabled={!newNotes.length}
              />
              <button onClick={() => closeModal()}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
