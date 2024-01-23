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
    switchToProject: (state, action: PayloadAction<string>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { createProject, switchToProject } = projectsSlice.actions;
