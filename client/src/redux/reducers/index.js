import { combineReducers } from "redux";
import colorReducer from "./colorReducer.js";
import authReducer from "./authReducer.js";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./categoryReducer.js";
import { userReducer } from "./userReducer.js";

const rootReducer = combineReducers({
  color: colorReducer,
  auth: authReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  user: userReducer,
});

export default rootReducer;
