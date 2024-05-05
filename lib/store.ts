import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './features/geoSlice';

export const geoStore = () => {
  return configureStore({
    reducer: {
      geo: geoReducer,
    },
  });
}

export type AppStore = ReturnType<typeof geoStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];