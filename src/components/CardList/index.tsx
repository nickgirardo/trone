import { Draggable, Droppable } from "react-beautiful-dnd";
import { createAppSelector, useAppSelector } from "../../store";
import { NewCard } from "./NewCard";
import { Card } from "../Card";

import "./index.scss";

interface Props {
  id: string;
  name: string;
  index: number;
}

export const CardList = ({ id, name, index }: Props) => {
  const cardSelector = createAppSelector([(state) => state.cards], (cards) =>
    Object.entries(cards)
      .filter(([_id, card]) => card.list === id)
      .map(([id, card]) => ({ id, ...card }))
      .sort((a, b) => a.index - b.index)
  );

  const cards = useAppSelector(cardSelector);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, _snapshot) => (
        <div
          className="card-list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-head" title={name} {...provided.dragHandleProps}>
            {name}
          </div>
          <div className="list-body">
            <Droppable droppableId={id} direction="vertical" type="card">
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
                      notes={card.notes}
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
      )}
    </Draggable>
  );
};
