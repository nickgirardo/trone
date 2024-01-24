import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import { useAppDispatch } from "../../store";
import { CardNotesModal } from "../modals/CardNotes";
import { updateNotes } from "../../reducers/Cards";

import "./index.scss";

interface Props {
  id: string;
  name: string;
  notes: string;
  index: number;
}

export const Card = ({ id, name, notes, index }: Props) => {
  const dispatch = useAppDispatch();

  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  const onModalComplete = (notes: string) => {
    dispatch(updateNotes({ id, notes }));
    setShowNewProjectModal(false);
  };

  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided, _snapshot) => (
          <div
            className={cn("card", notes.length && "with-notes")}
            ref={provided.innerRef}
            onClick={() => setShowNewProjectModal(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{name}</div>
            <div className="maybe-notes"></div>
          </div>
        )}
      </Draggable>
      <CardNotesModal
        isOpen={showNewProjectModal}
        notes={notes}
        handleUpdateNotes={(notes: string) => onModalComplete(notes)}
        closeModal={() => setShowNewProjectModal(false)}
      />
    </div>
  );
};
