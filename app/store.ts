import type { ThunkAction, Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import charactersReducer from './lib/charactersSlice.ts';
import {characterApi} from "./lib/services/characterApi";

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
