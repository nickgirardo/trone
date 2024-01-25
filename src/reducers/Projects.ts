import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Project = {
  name: string;
  index: number;
};

const initialState: {
  projects: { [k: string]: Project };
  currentProject: string | null;
} = {
  projects: {},
  currentProject: null as string | null,
};

// TODO potential future actions
// - rename project
// - delete project
export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    createProject: (state, action: PayloadAction<string>) => {
      const id = crypto.randomUUID();
      state.projects[id] = {
        name: action.payload,
        index: Object.keys(state.projects).length,
      };

      // Switch to the newly created project
      state.currentProject = id;
    },
    editProject: (
      state,
      action: PayloadAction<{ id: string; name?: string }>
    ) => {
      if (action.payload.name)
        state.projects[action.payload.id].name = action.payload.name;
    },
    moveProject: (
      state,
      action: PayloadAction<{ id: string; newIndex: number }>
    ) => {
      const { id, newIndex } = action.payload;

      const oldIndex = state.projects[id].index;

      if (oldIndex === newIndex) return;

      if (oldIndex > newIndex) {
        // Moving project down
        for (const proj of Object.values(state.projects)) {
          if (proj.index < oldIndex && proj.index >= newIndex) proj.index++;
        }
      } else {
        // Moving project up
        for (const proj of Object.values(state.projects)) {
          if (proj.index > oldIndex && proj.index <= newIndex) proj.index--;
        }
      }

      state.projects[id].index = newIndex;
    },
    switchToProject: (state, action: PayloadAction<string>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { createProject, editProject, moveProject, switchToProject } =
  projectsSlice.actions;
