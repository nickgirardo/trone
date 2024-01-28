import { useState } from "react";
import { useAppDispatch } from "../../store";
import { createCard } from "../../reducers/Cards";

import "./new-card.scss";

export const NewCard = ({ list }: { list: string }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");

  const handleCreateCard = () => {
    dispatch(createCard({ name, list }));
    setName("");
  };

  return (
    <div className="new-card">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={`new-card-${list}`}>Create a new card</label>
        <div className="inputs">
          <input
            value={name}
            type="text"
            id={`new-card-${list}`}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Card text"
            required
          />
          <input
            type="submit"
            onClick={handleCreateCard}
            value="Ok"
            disabled={name.length === 0}
          />
        </div>
      </form>
    </div>
  );
};
