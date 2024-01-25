import { ChangeEvent, useState } from "react";
import Modal from "react-modal";

import "./modal.scss";
import "./new-project-modal.scss";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleNewProject: (name: string) => void;
}

export const NewProjectModal = ({
  isOpen,
  closeModal,
  handleNewProject,
}: Props) => {
  const [name, setName] = useState<string>("");

  const onSubmit = () => {
    setName("");
    handleNewProject(name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="New Project"
      className="modal new-project-modal"
    >
      <h2>New Project</h2>
      <form>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setName(ev.target.value)
          }
        />
        <div className="controls">
          <input
            type="submit"
            value="New Project"
            onClick={onSubmit}
            disabled={!name.length}
          />
          <button onClick={() => closeModal()}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};
