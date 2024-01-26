export const uniq = <S>(arr: Array<S>) =>
  arr.filter((x, ix, xs) => xs.indexOf(x) === ix);

export const diff = <T>(
  before: Record<string, T>,
  after: Record<string, T>
): [Array<string>, Array<string>, Array<string>] => {
  const newEntries: Array<string> = [];
  const updatedEntries: Array<string> = [];
  const deletedEntries: Array<string> = [];

  for (const id of Object.keys(before)) {
    if (after[id] === undefined) deletedEntries.push(id);
  }
  for (const [id, newItem] of Object.entries(after)) {
    const oldItem = before[id];
    if (oldItem === undefined) {
      newEntries.push(id);
    } else {
      for (const key in newItem) {
        // @ts-ignore
        if (oldItem[key] === undefined || oldItem[key] !== newItem[key])
          updatedEntries.push(id);
      }
    }
  }

  return [newEntries, uniq(updatedEntries), deletedEntries];
};

export type WithId<T> = { id: string } & T;

export const withId =
  <T>(coll: Record<string, T>) =>
  (id: string): WithId<T> => ({ id, ...coll[id] });

// NOTE in theory this method could/ should omit the id property from T
// However this is not strictly necessary.  By ts' type system the absence of an unspecified field
// is not necessary
export const fromId = <T>(xs: Array<WithId<T>>): { [k: string]: T } => {
  let ret: { [k: string]: T } = {};
  for (const x of xs) {
    ret[x.id] = x;
  }
  return ret;
};

// Use this function to make sure that a value is never possible
// Especially usefull with switches and enums
export const assertNever = (x: never): never => {
  throw new Error(`Unexpected: ${x}`);
};
