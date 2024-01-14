import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TODO better representation for projects
// Having projects represented solely by their names will cause issues with collisions
const initialState = {
  projects: [] as Array<string>,
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
      state.projects.push(action.payload);

      state.currentProject = action.payload;
    },
    switchToProject: (state, action: PayloadAction<string>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { createProject, switchToProject } = projectsSlice.actions;
