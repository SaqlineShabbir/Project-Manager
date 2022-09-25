import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import filterSliceReducer from '../features/filter/filterSlice';
import teamsSliceReducer from '../features/teams/teamsSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,

    filters: filterSliceReducer,
    teams: teamsSliceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
