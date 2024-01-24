import { Draggable } from "react-beautiful-dnd";

import "./index.scss";

interface Props {
  id: string;
  name: string;
  index: number;
}

export const Card = ({ name, id, index }: Props) => (
  <Draggable draggableId={id} index={index}>
    {(provided, _snapshot) => (
      <div
        className="card"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {name}
      </div>
    )}
  </Draggable>
);
