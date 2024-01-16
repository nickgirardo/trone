import { ProjectList } from "../ProjectList";
import { ProjectBody } from "../ProjectBody";
import { createAppSelector, useAppSelector } from "../../store";

import "./index.scss";

function App() {
  const appSelector = createAppSelector(
    [(state) => state.projects, (state) => state.lists],
    (projects, lists) => {
      const { currentProject } = projects;

      if (currentProject === null) {
        return { currentProject, lists: [] };
      }

      const projectLists = Object.entries(lists)
        .filter(([_id, l]) => l.project === currentProject)
        .map(([id, l]) => ({ id, ...l }))
        .sort((a, b) => a.index - b.index);

      return { currentProject, lists: projectLists };
    }
  );

  const { currentProject, lists } = useAppSelector(appSelector);

  return (
    <div className="app">
      <ProjectList />
      {currentProject === null ? (
        <EmptyProjectBody />
      ) : (
        <ProjectBody project={currentProject} lists={lists} />
      )}
    </div>
  );
}

// TODO placeholder
const EmptyProjectBody = () => <></>;

export default App;
