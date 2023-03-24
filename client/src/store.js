import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./modules/loginSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
