import { MouseEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch, createAppSelector } from "../../store";
import cn from "classnames";
import { NewProjectModal } from "../modals/NewProject";
import { createProject, switchToProject } from "../../reducers/Projects";

import "./index.scss";

export const ProjectList = () => {
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const projectsSelector = createAppSelector(
    [(state) => state.projects],
    (projects) => ({
      currentProject: projects.currentProject,
      projects: Object.entries(projects.projects).map(([id, p]) => ({
        id,
        ...p,
      })),
    })
  );

  const { projects, currentProject } = useAppSelector(projectsSelector);
  const dispatch = useAppDispatch();

  const onModalComplete = (name: string) => {
    dispatch(createProject(name));
    setShowNewProjectModal(false);
  };

  const setCurrentProject = (id: string) => {
    if (id !== currentProject) dispatch(switchToProject(id));
  };

  return (
    <div className="project-list">
      <div className="projects">
        {projects.map((proj) => (
          <Project
            key={proj.id}
            id={proj.id}
            name={proj.name}
            currentProject={currentProject}
            onClick={() => setCurrentProject(proj.id)}
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
  id: string;
  name: string;
  currentProject: string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Project = ({ id, name, currentProject, onClick }: ProjectProps) => (
  <button
    className={cn("project", id === currentProject && "active")}
    onClick={onClick}
    title={name}
  >
    {name}
  </button>
);
