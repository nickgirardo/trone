import { useAppSelector } from "../../store";
import { NewCard } from "./NewCard";
import "./index.scss";

interface Props {
  id: string;
  name: string;
}

export const CardList = ({ id, name }: Props) => {
  const cards = useAppSelector((state) =>
    Object.entries(state.cards)
      .filter(([_id, card]) => card.list === id)
      .map(([id, card]) => ({ id, ...card }))
  );

  return (
    <div className="card-list">
      <div className="list-head">{name}</div>
      <div className="list-body">
        <div className="cards">
          {cards.map((card) => (
            <Card key={card.id} id={card.id} name={card.name} />
          ))}
        </div>
        <NewCard list={id} />
      </div>
    </div>
  );
};

interface CardProps {
  id: string;
  name: string;
}

const Card = ({ name }: CardProps) => <div className="card">{name}</div>;
