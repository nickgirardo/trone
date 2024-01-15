import { List } from "../../reducers/Lists";
import { CardList } from "../CardList";
import { NewList } from "../NewList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import "./index.scss";
import { useAppDispatch } from "../../store";
import { moveCard } from "../../reducers/Cards";

interface Props {
  project: string;
  lists: Array<List>;
}

export const ProjectBody = ({ project, lists }: Props) => {
  const dispatch = useAppDispatch();

  const handleDrag = (ev: DropResult) => {
    if (!ev.destination) return;

    dispatch(
      moveCard({
        newOrder: ev.destination.index,
        id: ev.draggableId,
        newList: ev.destination.droppableId,
      })
    );
  };

  return (
    <div className="project-body">
      <DragDropContext onDragEnd={handleDrag}>
        <div className="lists">
          {lists.map((l) => (
            <CardList name={l.name} id={l.id} key={l.id} />
          ))}
        </div>
        <NewList project={project} />
      </DragDropContext>
    </div>
  );
};
