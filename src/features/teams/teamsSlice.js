import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  teams: [],
};
const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});
export const { addTeams } = teamsSlice.actions;
export default teamsSlice.reducer;
