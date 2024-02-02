import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../store";
import { createList } from "../../reducers/Lists";

import "./index.scss";

export const NewList = ({ project }: { project: string }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");

  const handleCreateList = () => {
    dispatch(createList({ name, project }));
    setName("");
  };

  return (
    <div className="new-list">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={`new-list-${project}`}>Create a new list</label>
        <div className="controls">
          <input
            id={`new-list-${project}`}
            type="text"
            value={name}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setName(ev.target.value)
            }
            placeholder="List name"
            required
          />
          <input
            type="submit"
            onClick={handleCreateList}
            value="Ok"
            disabled={name.length === 0}
          />
        </div>
      </form>
    </div>
  );
};
