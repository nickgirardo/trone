import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TODO better representation for projects
// Having projects represented solely by their names will cause issues with collisions
const initialState = {
  projects: [] as Array<string>,
  currentProject: null as string | null,
};

export const projectListSlice = createSlice({
  name: "projectList",
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

export const { createProject, switchToProject } = projectListSlice.actions;
