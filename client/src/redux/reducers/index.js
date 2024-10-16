import { combineReducers } from "redux";
import colorReducer from "./colorReducer";

const rootReducer = combineReducers({
  color: colorReducer,
});

export default rootReducer;
