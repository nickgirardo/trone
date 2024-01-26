import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import { useAppDispatch } from "../../store";
import { EditCardModal } from "../modals/EditCard";
import { updateCard } from "../../reducers/Cards";

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

  const onModalComplete = (name: string, notes: string) => {
    dispatch(updateCard({ id, name, notes }));
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
      <EditCardModal
        isOpen={showNewProjectModal}
        id={id}
        name={name}
        notes={notes}
        handleUpdateCard={(name: string, notes: string) =>
          onModalComplete(name, notes)
        }
        closeModal={() => setShowNewProjectModal(false)}
      />
    </div>
  );
};
