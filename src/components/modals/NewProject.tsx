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

  const onSubmit = () => {
    setName("");
    handleNewProject(name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="New Project"
    >
      <form>
        <input
          placeholder="Project name"
          value={name}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setName(ev.target.value)
          }
        />
        <input
          type="submit"
          value="New Project"
          onClick={onSubmit}
          disabled={!name.length}
        />
        <button onClick={() => closeModal()}>Cancel</button>
      </form>
    </Modal>
  );
};
