import { MouseEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch, createAppSelector } from "../../store";
import cn from "classnames";
import {
  createProject,
  deleteProjects,
  editProject,
  moveProject,
  switchToProject,
} from "../../reducers/Projects";
import { deleteCards } from "../../reducers/Cards";
import { deleteLists } from "../../reducers/Lists";
import { DelProjWarning } from "../../reducers/Preferences";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { ConfirmModal } from "../modals/Confirm";
import { EditableLabel } from "../EditableLabel";
import { NewProjectModal } from "../modals/NewProject";
import { SettingsModal } from "../modals/Settings";

import "./index.scss";

export const ProjectList = () => {
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const projectsSelector = createAppSelector(
    [(state) => state.projects, (state) => state.lists, (state) => state.cards],
    (projects, lists, cards) => ({
      currentProject: projects.currentProject,
      projects: Object.entries(projects.projects)
        .map(([id, p]) => ({
          id,
          ...p,
        }))
        .sort((a, b) => a.index - b.index),
      lists,
      cards,
    })
  );

  const { projects, currentProject, lists, cards } =
    useAppSelector(projectsSelector);
  const dispatch = useAppDispatch();

  const onModalComplete = (name: string) => {
    dispatch(createProject(name));
    setShowNewProjectModal(false);
  };

  const setCurrentProject = (id: string) => {
    if (id !== currentProject) dispatch(switchToProject(id));
  };

  const deleteProject = (id: string) => {
    const projectLists = Object.entries(lists)
      .filter(([_id, l]) => l.project === id)
      .map(([id, _l]) => id);
    const projectCards = Object.entries(cards)
      .filter(([_id, c]) => projectLists.includes(c.list))
      .map(([id, _l]) => id);

    if (projectCards.length) dispatch(deleteCards(projectCards));
    if (projectLists.length) dispatch(deleteLists(projectLists));
    dispatch(deleteProjects([id]));
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
                    onDelete={() => deleteProject(proj.id)}
                    listCount={
                      Object.values(lists).filter((l) => l.project === proj.id)
                        .length
                    }
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
  onDelete: () => void;
  listCount: number;
}

const Project = ({
  id,
  index,
  name,
  active,
  onClick,
  onDelete,
  listCount,
}: ProjectProps) => {
  const dispatch = useAppDispatch();
  const delProjWarning = useAppSelector(
    (state) => state.preferences.delProjWarning
  );

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);

  const startDeleteProcess: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (
      delProjWarning === DelProjWarning.Always ||
      (delProjWarning === DelProjWarning.OnlyWithLists && listCount === 0)
    ) {
      onDelete();
    } else {
      // TODO
      setShowConfirmDeleteModal(true);
    }

    ev.preventDefault();
  };

  const listsWillBeDeletedMessage = (() => {
    if (!listCount) return undefined;
    if (listCount === 1)
      return "This will cause the list that belongs to it and all of its cards to be deleted.";
    return `This will cause the ${listCount} lists that belong to it and all of their cards to be deleted.`;
  })();

  return (
    <>
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
                onDelete={startDeleteProcess}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
        )}
      </Draggable>
      <ConfirmModal
        isOpen={showConfirmDeleteModal}
        closeModal={() => setShowConfirmDeleteModal(false)}
        handleConfirm={onDelete}
        label="Are you sure you want to delete this project?"
        moreInfo={listsWillBeDeletedMessage}
        noUndo
      />
    </>
  );
};
