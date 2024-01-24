import { ChangeEvent, MouseEventHandler, useRef, useState } from "react";

interface Props {
  label: string;
  onEdit: (updated: string) => void;
  isEmptyOk?: boolean;
}

export const EditableLabel = ({ label, onEdit, isEmptyOk = false }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(label);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const startEdit = () => {
    setIsEditing(true);
    // NOTE if this isn't queued the input element will not yet be in the vdom
    queueMicrotask(() => {
      if (inputRef && inputRef.current) inputRef.current.focus();
    });
  };

  const onSubmit: MouseEventHandler<HTMLInputElement> = (ev) => {
    setIsEditing(false);
    onEdit(newValue);

    ev.preventDefault();
  };

  const onBlur = () => {
    // NOTE if this isn't queued it would eat the input event if the user blurred by clicking the
    // update button
    queueMicrotask(() => setIsEditing(false));
  };

  return (
    <div>
      {isEditing ? (
        <form>
          <input
            placeholder="List Name"
            ref={inputRef}
            value={newValue}
            onBlur={onBlur}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setNewValue(ev.target.value)
            }
            onKeyDown={(ev) => ev.key === "Escape" && setIsEditing(false)}
          />
          <input
            type="submit"
            value="Update"
            onClick={onSubmit}
            disabled={isEmptyOk || !newValue.length}
          />
        </form>
      ) : (
        <span onClick={startEdit}>{label}</span>
      )}
    </div>
  );
};
