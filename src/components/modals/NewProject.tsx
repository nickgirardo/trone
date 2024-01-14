import { ChangeEvent, useState } from "react";
import Modal from "react-modal";

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="New Project"
    >
      <form>
        <input
          value={name}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setName(ev.target.value)
          }
        />
        <input
          type="submit"
          value="New Project"
          onClick={() => handleNewProject(name)}
        />
        <button onClick={() => closeModal()}>Cancel</button>
      </form>
    </Modal>
  );
};
