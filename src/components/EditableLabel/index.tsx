import { ChangeEvent, MouseEventHandler, useRef, useState } from "react";
import cn from "classnames";

import "./index.scss";

interface Props {
  label: string;
  placeholder?: string;
  onEdit: (updated: string) => void;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  isEmptyOk?: boolean;
}

export const EditableLabel = ({
  label,
  placeholder,
  onEdit,
  onDelete,
  isEmptyOk = false,
}: Props) => {
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
    setTimeout(() => setIsEditing(false), 200);
  };

  return (
    <div className={cn("editable-label", isEditing && "editing")}>
      {isEditing ? (
        <form>
          <input
            placeholder={placeholder}
            className="primary-input"
            ref={inputRef}
            value={newValue}
            onBlur={onBlur}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setNewValue(ev.target.value)
            }
            onKeyDown={(ev) => ev.key === "Escape" && setIsEditing(false)}
          />
          <div className="controls">
            <input
              type="submit"
              value="Update"
              onClick={onSubmit}
              disabled={isEmptyOk || !newValue.length}
            />
            {onDelete && <button onClick={onDelete}>Delete</button>}
          </div>
        </form>
      ) : (
        <span onClick={startEdit}>{label}</span>
      )}
    </div>
  );
};
