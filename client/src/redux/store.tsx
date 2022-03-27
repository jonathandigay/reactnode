import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
