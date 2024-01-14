import { ProjectList } from "../ProjectList";
import { ProjectBody } from "../ProjectBody";
import { useAppSelector } from "../../store";

import "./index.scss";

function App() {
  const { currentProject, lists } = useAppSelector((state) => {
    const { currentProject } = state.projects;

    if (currentProject === null) {
      return { currentProject, lists: [] };
    }

    const lists = state.lists.filter((l) => l.project === currentProject);
    return { currentProject, lists };
  });

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
