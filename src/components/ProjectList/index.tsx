import { MouseEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch, createAppSelector } from "../../store";
import cn from "classnames";
import {
  createProject,
  editProject,
  moveProject,
  switchToProject,
} from "../../reducers/Projects";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { EditableLabel } from "../EditableLabel";
import { NewProjectModal } from "../modals/NewProject";
import { SettingsModal } from "../modals/Settings";

import "./index.scss";

export const ProjectList = () => {
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const projectsSelector = createAppSelector(
    [(state) => state.projects],
    (projects) => ({
      currentProject: projects.currentProject,
      projects: Object.entries(projects.projects)
        .map(([id, p]) => ({
          id,
          ...p,
        }))
        .sort((a, b) => a.index - b.index),
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

  const handleDrag = (ev: DropResult) => {
    if (!ev.destination) return;

    dispatch(
      moveProject({ id: ev.draggableId, newIndex: ev.destination.index })
    );
  };

  return (
    <div className="project-list">
      <DragDropContext onDragEnd={handleDrag}>
        <div className="projects">
          <Droppable droppableId="project-list" direction="horizontal">
            {(provided, _snapshot) => (
              <div
                className="projects-inner"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {projects.map((proj) => (
                  <Project
                    key={proj.id}
                    id={proj.id}
                    index={proj.index}
                    name={proj.name}
                    active={currentProject === proj.id}
                    onClick={() => setCurrentProject(proj.id)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="controls">
          <div
            className="new-project"
            onClick={() => setShowNewProjectModal(true)}
          >
            +
          </div>
          <div className="settings" onClick={() => setShowSettingsModal(true)}>
            ⚙
          </div>
        </div>
        <SettingsModal
          isOpen={showSettingsModal}
          closeModal={() => setShowSettingsModal(false)}
        />
        <NewProjectModal
          isOpen={showNewProjectModal}
          handleNewProject={(name) => onModalComplete(name)}
          closeModal={() => setShowNewProjectModal(false)}
        />
      </DragDropContext>
    </div>
  );
};

interface ProjectProps {
  id: string;
  index: number;
  name: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Project = ({ id, index, name, active, onClick }: ProjectProps) => {
  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, _snapshot) => (
        <div
          className={cn("project", active && "active")}
          onClick={onClick}
          title={name}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {active ? (
            <EditableLabel
              label={name}
              placeholder="Project Name"
              onEdit={(name) => dispatch(editProject({ id, name }))}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
      )}
    </Draggable>
  );
};
