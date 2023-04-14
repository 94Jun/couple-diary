import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./modules/loginSlice";
import modalReducer from "./modules/modalSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
  },
});
