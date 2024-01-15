import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../store";
import { createCard } from "../../reducers/Cards";

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
        <label>
          Create a new card
          <input
            value={name}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setName(ev.target.value)
            }
            placeholder="Card text"
            required
          />
        </label>
        <input
          type="submit"
          onClick={handleCreateCard}
          value="Ok"
          disabled={name.length === 0}
        />
      </form>
    </div>
  );
};
