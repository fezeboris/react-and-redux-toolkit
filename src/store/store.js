import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/couter/counterSlice";
import authenticationReducer from "../features/users/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    autentication: authenticationReducer,
  },
});
