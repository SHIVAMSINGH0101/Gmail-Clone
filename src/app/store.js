import { configureStore } from "@reduxjs/toolkit";
//mail reducer manages the mailSlice
import mailReducer from "../features/mailSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  //map the slice to the state
  reducer: {
    mail: mailReducer,
    user: userReducer,
  },
});
