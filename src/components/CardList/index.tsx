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
      .sort((a, b) => a.order - b.order)
  );

  const cards = useAppSelector(cardSelector);

  return (
    <div className="card-list">
      <div className="list-head">{name}</div>
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
                  order={card.order}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewCard list={id} />
      </div>
    </div>
  );
};

interface CardProps {
  id: string;
  name: string;
  order: number;
}

const Card = ({ name, id, order }: CardProps) => (
  <Draggable draggableId={id} index={order}>
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
