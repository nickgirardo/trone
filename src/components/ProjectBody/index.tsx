import { List } from "../../reducers/Lists";
import { List as ListEl } from "../List";
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
        <ListEl name={l.name} id={l.id} key={l.id} />
      ))}
    </div>
    <NewList project={project} />
  </div>
);
