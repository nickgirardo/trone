import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Project = {
  name: string;
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
      state.projects[id] = { name: action.payload };

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
    switchToProject: (state, action: PayloadAction<string>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { createProject, editProject, switchToProject } =
  projectsSlice.actions;
