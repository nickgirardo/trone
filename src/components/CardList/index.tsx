import { Draggable, Droppable } from "react-beautiful-dnd";
import { createAppSelector, useAppDispatch, useAppSelector } from "../../store";
import { deleteLists, editList } from "../../reducers/Lists";
import { NewCard } from "./NewCard";
import { Card } from "../Card";
import { EditableLabel } from "../EditableLabel";

import "./index.scss";
import { DelListWarning } from "../../reducers/Preferences";
import { MouseEventHandler, useState } from "react";
import { ConfirmModal } from "../modals/Confirm";
import { deleteCards } from "../../reducers/Cards";

interface Props {
  id: string;
  name: string;
  index: number;
}

export const CardList = ({ id, name, index }: Props) => {
  const dispatch = useAppDispatch();

  const cardSelector = createAppSelector([(state) => state.cards], (cards) =>
    Object.entries(cards)
      .filter(([_id, card]) => card.list === id)
      .map(([id, card]) => ({ id, ...card }))
      .sort((a, b) => a.index - b.index)
  );

  const cards = useAppSelector(cardSelector);
  const delListWarning = useAppSelector(
    (state) => state.preferences.delListWarning
  );

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);

  const startDeleteProcess: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (
      delListWarning === DelListWarning.Always ||
      (delListWarning === DelListWarning.OnlyWithCards && cards.length === 0)
    ) {
      deleteListAndRelatedCards();
    } else {
      setShowConfirmDeleteModal(true);
    }

    ev.preventDefault();
  };

  const deleteListAndRelatedCards = () => {
    if (cards.length) dispatch(deleteCards(cards.map((c) => c.id)));
    dispatch(deleteLists([id]));
  };

  const cardsWillBeDeletedMessage = (() => {
    if (!cards.length) return undefined;
    if (cards.length === 1)
      return "This will cause the card that belongs to it to be deleted.";
    return `This will cause the ${cards.length} cards that belong to it to be deleted.`;
  })();

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, _snapshot) => (
          <div
            className="card-list"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className="list-head"
              title={name}
              {...provided.dragHandleProps}
            >
              <EditableLabel
                label={name}
                placeholder="List Name"
                onEdit={(name) => dispatch(editList({ id, name }))}
                onDelete={startDeleteProcess}
              />
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
      <ConfirmModal
        isOpen={showConfirmDeleteModal}
        closeModal={() => setShowConfirmDeleteModal(false)}
        handleConfirm={deleteListAndRelatedCards}
        label="Are you sure you want to delete this list?"
        noUndo
      >
        {cardsWillBeDeletedMessage && <div>{cardsWillBeDeletedMessage}</div>}
      </ConfirmModal>
    </>
  );
};
