import { ListWithId, moveList } from "../../reducers/Lists";
import { CardList } from "../CardList";
import { NewList } from "../NewList";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import "./index.scss";
import { useAppDispatch } from "../../store";
import { moveCard } from "../../reducers/Cards";

interface Props {
  project: string;
  lists: Array<ListWithId>;
}

export const ProjectBody = ({ project, lists }: Props) => {
  const dispatch = useAppDispatch();

  const handleDrag = (ev: DropResult) => {
    if (!ev.destination) return;

    if (ev.destination.droppableId === project) {
      dispatch(
        moveList({ newIndex: ev.destination.index, id: ev.draggableId })
      );
    } else {
      dispatch(
        moveCard({
          newIndex: ev.destination.index,
          id: ev.draggableId,
          newList: ev.destination.droppableId,
        })
      );
    }
  };

  return (
    <div className="project-body">
      <DragDropContext onDragEnd={handleDrag}>
        {/* TODO `project` seems like the best id here, but not sure */}
        <Droppable
          droppableId={project}
          direction="horizontal"
          type="card-list"
        >
          {(provided, _snapshot) => (
            <div
              className="lists"
              key={project}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((l) => (
                <CardList name={l.name} id={l.id} key={l.id} index={l.index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewList project={project} />
      </DragDropContext>
    </div>
  );
};
