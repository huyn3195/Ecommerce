import { combineReducers } from "redux";
import colorReducer from "./colorReducer.js";
import authReducer from "./authReducer.js";

const rootReducer = combineReducers({
  color: colorReducer,
  auth: authReducer,
});

export default rootReducer;
