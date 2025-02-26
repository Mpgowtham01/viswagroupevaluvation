import { configureStore } from "@reduxjs/toolkit";
import labReducer from "./Slice";

export const store = configureStore({
  reducer: {
    labs: labReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
