import { ProjectList } from "../ProjectList";
import { ProjectBody } from "../ProjectBody";
import { MobileWarning } from "../MobileWarning";
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
      <MobileWarning />
      <ProjectList />
      <div className="app-main">
        {currentProject && (
          <ProjectBody project={currentProject} lists={lists} />
        )}
      </div>
    </div>
  );
}

export default App;
