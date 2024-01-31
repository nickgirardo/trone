import { useState } from "react";
import { useAppDispatch } from "../../store";
import { createProject } from "../../reducers/Projects";
import { NewProjectModal } from "../modals/NewProject";

import "./new-project.scss";

interface Props {
  showFirstProjectHelper: boolean;
}

export const NewProject = ({ showFirstProjectHelper }: Props) => {
  const dispatch = useAppDispatch();

  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const onModalComplete = (name: string) => {
    dispatch(createProject(name));
    setShowNewProjectModal(false);
  };

  return (
    <div className="new-project-container">
      <div className="new-project" onClick={() => setShowNewProjectModal(true)}>
        <div className="icon">+</div>
      </div>
      {showFirstProjectHelper && (
        <div className="first-project-helper">
          <div className="icon">↑</div>
          <div className="body">Create your first project to get started!</div>
        </div>
      )}
      <NewProjectModal
        isOpen={showNewProjectModal}
        handleNewProject={(name) => onModalComplete(name)}
        closeModal={() => setShowNewProjectModal(false)}
      />
    </div>
  );
};
