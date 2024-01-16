import { Draggable, Droppable } from "react-beautiful-dnd";
import { createAppSelector, useAppSelector } from "../../store";
import { NewCard } from "./NewCard";
import "./index.scss";

interface Props {
  id: string;
  name: string;
}

export const CardList = ({ id, name }: Props) => {
  const cardSelector = createAppSelector([(state) => state.cards], (cards) =>
    Object.entries(cards)
      .filter(([_id, card]) => card.list === id)
      .map(([id, card]) => ({ id, ...card }))
      .sort((a, b) => a.index - b.index)
  );

  const cards = useAppSelector(cardSelector);

  return (
    <div className="card-list">
      <div className="list-head" title={name}>
        {name}
      </div>
      <div className="list-body">
        <Droppable droppableId={id} direction="vertical">
          {(provided, _snapshot) => (
            <div
              className="cards"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  index={card.index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <NewCard list={id} />
    </div>
  );
};

interface CardProps {
  id: string;
  name: string;
  index: number;
}

const Card = ({ name, id, index }: CardProps) => (
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
