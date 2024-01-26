import { useState } from "react";
import Modal from "react-modal";
import cn from "classnames";
import { assertNever } from "../../../util";

import "../modal.scss";
import "./index.scss";
import { Preferences } from "./Preferences";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

enum SettingsTab {
  ManageProject,
  Preferences,
}

export const SettingsModal = ({ isOpen, closeModal }: Props) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    SettingsTab.Preferences
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Settings"
      className="modal modal-lg settings-modal"
    >
      <h2>Settings</h2>
      <div className="modal-body">
        <div className="tab-select">
          <div
            className={cn(
              "tab-select-btn",
              activeTab === SettingsTab.ManageProject && "active"
            )}
            onClick={() => setActiveTab(SettingsTab.ManageProject)}
          >
            Manage Project
          </div>
          <div
            onClick={() => setActiveTab(SettingsTab.Preferences)}
            className={cn(
              "tab-select-btn",
              activeTab === SettingsTab.Preferences && "active"
            )}
          >
            Preferences
          </div>
        </div>
        <div className="settings-body">
          <SettingsBody tab={activeTab} />
        </div>
      </div>
    </Modal>
  );
};

const SettingsBody = ({ tab }: { tab: SettingsTab }) => {
  switch (tab) {
    case SettingsTab.ManageProject:
      return <ManageProject />;

    case SettingsTab.Preferences:
      return <Preferences />;

    default:
      return assertNever(tab);
  }
};

const ManageProject = () => <></>;
