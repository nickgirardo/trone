import { MouseEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import cn from "classnames";
import { NewProjectModal } from "../modals/NewProject";
import { createProject, switchToProject } from "../../reducers/Projects";

import "./index.scss";

export const ProjectList = () => {
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const { projects, currentProject } = useAppSelector(
    (state) => state.projects
  );
  const dispatch = useAppDispatch();

  const onModalComplete = (name: string) => {
    dispatch(createProject(name));
    setShowNewProjectModal(false);
  };

  const setCurrentProject = (name: string) => {
    if (name !== currentProject) dispatch(switchToProject(name));
  };

  return (
    <div className="project-list">
      <div className="projects">
        {projects.map((proj) => (
          <Project
            key={proj}
            name={proj}
            currentProject={currentProject}
            onClick={() => setCurrentProject(proj)}
          />
        ))}
      </div>
      <div className="new-project" onClick={() => setShowNewProjectModal(true)}>
        <button>+</button>
      </div>
      <NewProjectModal
        isOpen={showNewProjectModal}
        handleNewProject={(name) => onModalComplete(name)}
        closeModal={() => setShowNewProjectModal(false)}
      />
    </div>
  );
};

interface ProjectProps {
  name: string;
  currentProject: string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Project = ({ name, currentProject, onClick }: ProjectProps) => (
  <button
    className={cn("project", name === currentProject && "active")}
    onClick={onClick}
  >
    {name}
  </button>
);
