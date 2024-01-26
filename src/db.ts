import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Project } from "./reducers/Projects";
import { Card } from "./reducers/Cards";
import { List } from "./reducers/Lists";
import { RootState } from "./store";
import { WithId, fromId } from "./util";
import { Preferences, defaultPrefs } from "./reducers/Preferences";

let db: IDBPDatabase<Schema> | null = null;
const dbName = "test_db";
const dbVersion = 5;

interface Schema extends DBSchema {
  projects: {
    key: string;
    value: WithId<Project>;
  };
  lists: {
    key: string;
    value: WithId<List>;
  };
  cards: {
    key: string;
    value: WithId<Card>;
  };
  currentProject: { key: "data"; value: string | null };
  preferences: {
    key: "data";
    value: Preferences;
  };
}

export async function getDB() {
  if (!db) await initDB();
  if (!db) throw new Error("Unable to initialize db :(");

  return db;
}

export async function initDB() {
  let migration: Promise<unknown> = Promise.resolve();

  db = await openDB<Schema>(dbName, dbVersion, {
    upgrade(db, oldVersion, _newVersion, tx) {
      // Creating the db for the first time
      if (oldVersion === 0) {
        db.createObjectStore("projects", { keyPath: "id" });
        db.createObjectStore("lists", { keyPath: "id" });
        db.createObjectStore("cards", { keyPath: "id" });
        db.createObjectStore("currentProject");

        // Currently the currentProject starting as null is the only initial data we need to set
        migration = migration.then(async function () {
          await tx.objectStore("currentProject").put(null, "data");
        });
      }
      if (oldVersion <= 3) {
        // Adding indicies to projects
        migration = migration.then(async function () {
          const projects = await tx.objectStore("projects").getAll();
          for (const [ix, p] of projects.entries()) {
            p.index = ix;
          }
          await Promise.all(
            projects.map((p) => tx.objectStore("projects").put(p))
          );
        });
      }
      if (oldVersion <= 4) {
        db.createObjectStore("preferences");

        // Add default preferences
        migration = migration.then(async function () {
          await tx.objectStore("preferences").put(defaultPrefs, "data");
        });
      }
    },
  });

  await migration;
}

// TODO any
export async function dumpDb(db: IDBPDatabase<Schema>): Promise<RootState> {
  const tx = db.transaction(
    ["currentProject", "projects", "lists", "cards", "preferences"],
    "readonly"
  );
  const [currentProject, projects, lists, cards, preferences] =
    await Promise.all([
      tx.objectStore("currentProject").get("data"),
      tx.objectStore("projects").getAll(),
      tx.objectStore("lists").getAll(),
      tx.objectStore("cards").getAll(),
      tx.objectStore("preferences").get("data"),
    ]);

  return {
    projects: {
      currentProject: currentProject || null,
      projects: fromId(projects),
    },
    lists: fromId(lists),
    cards: fromId(cards),
    preferences: preferences || defaultPrefs,
  };
}

export async function setCurrentProject(
  db: IDBPDatabase<Schema>,
  project: string | null
) {
  const tx = db.transaction("currentProject", "readwrite");
  await tx.store.put(project, "data");
  await tx.done;
}

export async function setPreferences(
  db: IDBPDatabase<Schema>,
  preferences: Preferences
) {
  const tx = db.transaction("preferences", "readwrite");
  await tx.store.put(preferences, "data");
  await tx.done;
}

async function putProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<WithId<Project>>
) {
  if (!projects.length) return;

  const tx = db.transaction("projects", "readwrite");
  await Promise.all(projects.map((p) => tx.store.put(p)));
  await tx.done;
}

async function putLists(db: IDBPDatabase<Schema>, lists: Array<WithId<List>>) {
  if (!lists.length) return;

  const tx = db.transaction("lists", "readwrite");
  await Promise.all(lists.map((l) => tx.store.put(l)));
  await tx.done;
}

async function putCards(db: IDBPDatabase<Schema>, cards: Array<WithId<Card>>) {
  if (!cards.length) return;

  const tx = db.transaction("cards", "readwrite");
  await Promise.all(cards.map((c) => tx.store.put(c)));
  await tx.done;
}

export async function addProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<WithId<Project>>
) {
  await putProjects(db, projects);
}
export async function addProject(
  db: IDBPDatabase<Schema>,
  project: WithId<Project>
) {
  await putProjects(db, [project]);
}
export async function updateProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<WithId<Project>>
) {
  await putProjects(db, projects);
}
export async function updateProject(
  db: IDBPDatabase<Schema>,
  project: WithId<Project>
) {
  await putProjects(db, [project]);
}
export async function deleteProject(
  db: IDBPDatabase<Schema>,
  project: WithId<Project>
) {
  await deleteProjects(db, [project]);
}
export async function deleteProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<WithId<Project>>
) {
  if (!projects.length) return;

  const tx = db.transaction("cards", "readwrite");
  await Promise.all(projects.map((p) => tx.store.delete(p.id)));
  await tx.done;
}

export async function addLists(
  db: IDBPDatabase<Schema>,
  lists: Array<WithId<List>>
) {
  await putLists(db, lists);
}
export async function addList(db: IDBPDatabase<Schema>, list: WithId<List>) {
  await putLists(db, [list]);
}
export async function updateLists(
  db: IDBPDatabase<Schema>,
  lists: Array<WithId<List>>
) {
  await putLists(db, lists);
}
export async function updateList(db: IDBPDatabase<Schema>, list: WithId<List>) {
  await putLists(db, [list]);
}
export async function deleteList(db: IDBPDatabase<Schema>, list: WithId<List>) {
  await deleteLists(db, [list]);
}
export async function deleteLists(
  db: IDBPDatabase<Schema>,
  lists: Array<WithId<List>>
) {
  if (!lists.length) return;

  const tx = db.transaction("lists", "readwrite");
  await Promise.all(lists.map((l) => tx.store.delete(l.id)));
  await tx.done;
}

export async function addCards(
  db: IDBPDatabase<Schema>,
  cards: Array<WithId<Card>>
) {
  await putCards(db, cards);
}
export async function addCard(db: IDBPDatabase<Schema>, card: WithId<Card>) {
  await putCards(db, [card]);
}
export async function updateCards(
  db: IDBPDatabase<Schema>,
  cards: Array<WithId<Card>>
) {
  await putCards(db, cards);
}
export async function updateCard(db: IDBPDatabase<Schema>, card: WithId<Card>) {
  await putCards(db, [card]);
}

export async function deleteCard(db: IDBPDatabase<Schema>, card: WithId<Card>) {
  await deleteCards(db, [card]);
}
export async function deleteCards(
  db: IDBPDatabase<Schema>,
  cards: Array<WithId<Card>>
) {
  if (!cards.length) return;

  const tx = db.transaction("cards", "readwrite");
  await Promise.all(cards.map((c) => tx.store.delete(c.id)));
  await tx.done;
}
