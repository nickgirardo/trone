import { DBSchema, IDBPDatabase, openDB } from "idb";
import { ProjectWithId } from "./reducers/Projects";
import { CardWithId } from "./reducers/Cards";
import { ListWithId } from "./reducers/Lists";
import { RootState } from "./store";
import { fromId } from "./util";

let db: IDBPDatabase<Schema> | null = null;
const dbName = "test_db";
const dbVersion = 1;

interface Schema extends DBSchema {
  projects: {
    key: string;
    value: ProjectWithId;
  };
  lists: {
    key: string;
    value: ListWithId;
  };
  cards: {
    key: string;
    value: CardWithId;
  };
  currentProject: { key: "data"; value: string | null };
}

export async function getDB() {
  if (!db) await initDB();
  if (!db) throw new Error("Unable to initialize db :(");

  return db;
}

export async function initDB() {
  let needsInitialData = false;

  db = await openDB<Schema>(dbName, dbVersion, {
    upgrade(db, oldVersion) {
      // Creating the db for the first time
      if (oldVersion === 0) {
        db.createObjectStore("projects", { keyPath: "id" });
        db.createObjectStore("lists", { keyPath: "id" });
        db.createObjectStore("cards", { keyPath: "id" });
        db.createObjectStore("currentProject");

        needsInitialData = true;
      } else {
        throw new Error(
          `Attempting to upgrade db "${dbName} from unknown version ${oldVersion}`
        );
      }
    },
  });

  if (needsInitialData) {
    // Currently the currentProject starting as null is the only initial data we need to set
    const tx = db.transaction("currentProject", "readwrite");
    await tx.store.put(null, "data");
    await tx.done;
  }
}

// TODO any
export async function dumpDb(db: IDBPDatabase<Schema>): Promise<RootState> {
  const tx = db.transaction(
    ["currentProject", "projects", "lists", "cards"],
    "readonly"
  );
  const [currentProject, projects, lists, cards] = await Promise.all([
    tx.objectStore("currentProject").get("data"),
    tx.objectStore("projects").getAll(),
    tx.objectStore("lists").getAll(),
    tx.objectStore("cards").getAll(),
  ]);

  return {
    projects: {
      currentProject: currentProject || null,
      projects: fromId(projects),
    },
    lists: fromId(lists),
    cards: fromId(cards),
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

async function putProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<ProjectWithId>
) {
  if (!projects.length) return;

  const tx = db.transaction("projects", "readwrite");
  await Promise.all(projects.map((p) => tx.store.put(p)));
  await tx.done;
}

async function putLists(db: IDBPDatabase<Schema>, lists: Array<ListWithId>) {
  if (!lists.length) return;

  const tx = db.transaction("lists", "readwrite");
  await Promise.all(lists.map((l) => tx.store.put(l)));
  await tx.done;
}

async function putCards(db: IDBPDatabase<Schema>, cards: Array<CardWithId>) {
  if (!cards.length) return;

  const tx = db.transaction("cards", "readwrite");
  await Promise.all(cards.map((c) => tx.store.put(c)));
  await tx.done;
}

export async function addProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<ProjectWithId>
) {
  await putProjects(db, projects);
}
export async function addProject(
  db: IDBPDatabase<Schema>,
  project: ProjectWithId
) {
  await putProjects(db, [project]);
}
export async function updateProjects(
  db: IDBPDatabase<Schema>,
  projects: Array<ProjectWithId>
) {
  await putProjects(db, projects);
}
export async function updateProject(
  db: IDBPDatabase<Schema>,
  project: ProjectWithId
) {
  await putProjects(db, [project]);
}

export async function addLists(
  db: IDBPDatabase<Schema>,
  lists: Array<ListWithId>
) {
  await putLists(db, lists);
}
export async function addList(db: IDBPDatabase<Schema>, list: ListWithId) {
  await putLists(db, [list]);
}
export async function updateLists(
  db: IDBPDatabase<Schema>,
  lists: Array<ListWithId>
) {
  await putLists(db, lists);
}
export async function updateList(db: IDBPDatabase<Schema>, list: ListWithId) {
  await putLists(db, [list]);
}

export async function addCards(
  db: IDBPDatabase<Schema>,
  cards: Array<CardWithId>
) {
  await putCards(db, cards);
}
export async function addCard(db: IDBPDatabase<Schema>, cards: CardWithId) {
  await putCards(db, [cards]);
}
export async function updateCards(
  db: IDBPDatabase<Schema>,
  cards: Array<CardWithId>
) {
  await putCards(db, cards);
}
export async function updateCard(db: IDBPDatabase<Schema>, cards: CardWithId) {
  await putCards(db, [cards]);
}
