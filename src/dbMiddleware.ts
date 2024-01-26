import { RootState } from "./store";
import {
  addProjects,
  setCurrentProject,
  updateProjects,
  addCards,
  updateCards,
  addLists,
  updateLists,
  getDB,
  dumpDb,
  setPreferences,
} from "./db";
import { diff, withId } from "./util";

// TODO once we start allowing deletion of items use that info here
export const dbMiddleware = (store: any) => (next: any) =>
  async function (action: any) {
    const before: RootState = structuredClone(store.getState());
    const result = next(action);
    const after: RootState = structuredClone(store.getState());

    const db = await getDB();

    const [newProjects, updatedProjects] = diff(
      before.projects.projects,
      after.projects.projects
    );
    const [newLists, updatedLists] = diff(before.lists, after.lists);
    const [newCards, updatedCards] = diff(before.cards, after.cards);

    const prefsChanged =
      before.preferences.delProjWarning !== after.preferences.delProjWarning ||
      before.preferences.delListWarning !== after.preferences.delListWarning ||
      before.preferences.delCardWarning !== after.preferences.delCardWarning;

    await Promise.all([
      after.projects.currentProject !== before.projects.currentProject
        ? setCurrentProject(db, after.projects.currentProject)
        : Promise.resolve(),
      prefsChanged ? setPreferences(db, after.preferences) : Promise.resolve(),
      addProjects(db, newProjects.map(withId(after.projects.projects))),
      updateProjects(db, updatedProjects.map(withId(after.projects.projects))),
      addLists(db, newLists.map(withId(after.lists))),
      updateLists(db, updatedLists.map(withId(after.lists))),
      addCards(db, newCards.map(withId(after.cards))),
      updateCards(db, updatedCards.map(withId(after.cards))),
    ]);

    console.log(await dumpDb(db));

    return result;
  };
