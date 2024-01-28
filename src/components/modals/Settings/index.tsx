import Modal from "react-modal";
import { Preferences } from "./Preferences";
import { Persistence } from "./Persistence";
import { ImportExport } from "./ImportExport";

import "../modal.scss";
import "./index.scss";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const SettingsModal = ({ isOpen, closeModal }: Props) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Settings"
    className="modal modal-md settings-modal"
  >
    <h2>Settings</h2>
    <div className="modal-body">
      <Preferences />
      <Persistence />
      <ImportExport />
    </div>
  </Modal>
);
