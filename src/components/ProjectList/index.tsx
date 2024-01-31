import { useState } from "react";
import { useAppSelector, useAppDispatch, createAppSelector } from "../../store";
import {
  deleteProjects,
  moveProject,
  switchToProject,
} from "../../reducers/Projects";
import { deleteCards } from "../../reducers/Cards";
import { deleteLists } from "../../reducers/Lists";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { SettingsModal } from "../modals/Settings";
import { Project } from "./Project";
import { NewProject } from "./NewProject";

import "./index.scss";

export const ProjectList = () => {
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
          <NewProject showFirstProjectHelper={projects.length === 0} />
          <div className="settings" onClick={() => setShowSettingsModal(true)}>
            ⚙
          </div>
        </div>
        <SettingsModal
          isOpen={showSettingsModal}
          closeModal={() => setShowSettingsModal(false)}
        />
      </DragDropContext>
    </div>
  );
};
