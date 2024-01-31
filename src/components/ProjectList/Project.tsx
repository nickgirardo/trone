import { MouseEventHandler, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../store";
import { DelProjWarning } from "../../reducers/Preferences";
import { editProject } from "../../reducers/Projects";
import { EditableLabel } from "../EditableLabel";
import { ConfirmModal } from "../modals/Confirm";

interface Props {
  id: string;
  index: number;
  name: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onDelete: () => void;
  listCount: number;
}

export const Project = ({
  id,
  index,
  name,
  active,
  onClick,
  onDelete,
  listCount,
}: Props) => {
  const dispatch = useAppDispatch();
  const delProjWarning = useAppSelector(
    (state) => state.preferences.delProjWarning
  );

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);

  const startDeleteProcess: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (
      delProjWarning === DelProjWarning.Always ||
      (delProjWarning === DelProjWarning.OnlyWithLists && listCount === 0)
    ) {
      onDelete();
    } else {
      // TODO
      setShowConfirmDeleteModal(true);
    }

    ev.preventDefault();
  };

  const listsWillBeDeletedMessage = (() => {
    if (!listCount) return undefined;
    if (listCount === 1)
      return "This will cause the list that belongs to it and all of its cards to be deleted.";
    return `This will cause the ${listCount} lists that belong to it and all of their cards to be deleted.`;
  })();

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, _snapshot) => (
          <div
            className={cn("project", active && "active")}
            onClick={onClick}
            title={name}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {active ? (
              <EditableLabel
                label={name}
                placeholder="Project Name"
                onEdit={(name) => dispatch(editProject({ id, name }))}
                onDelete={startDeleteProcess}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
        )}
      </Draggable>
      <ConfirmModal
        isOpen={showConfirmDeleteModal}
        closeModal={() => setShowConfirmDeleteModal(false)}
        handleConfirm={onDelete}
        label="Are you sure you want to delete this project?"
        noUndo
      >
        {listsWillBeDeletedMessage && <div>{listsWillBeDeletedMessage}</div>}
      </ConfirmModal>
    </>
  );
};
