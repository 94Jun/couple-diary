import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./modules/loginSlice";
import modalReducer from "./modules/modalSlice";
import letterReducer from "./modules/letterSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    letter: letterReducer,
  },
});
