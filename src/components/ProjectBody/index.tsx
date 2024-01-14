import { List } from "../../reducers/Lists";
import { NewList } from "../NewList";
import "./index.scss";

interface Props {
  project: string;
  lists: Array<List>;
}

export const ProjectBody = ({ project, lists }: Props) => (
  <div className="project-body">
    <div className="lists">
      {lists.map((l) => (
        <ListEl name={l.name} key={l.id} />
      ))}
    </div>
    <NewList project={project} />
  </div>
);

const ListEl = ({ name }: { name: string }) => (
  <div className="list">
    <div className="list-head">{name}</div>
    <div className="list-body">TODO lol</div>
  </div>
);
